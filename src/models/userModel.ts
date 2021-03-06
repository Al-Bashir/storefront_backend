import { myError } from './errorModel';
import pgConnectionPool from '../config/database';
import * as passwordUtilities from '../utility/passwordUtilities';

export type User = {
    id?: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
    token?: string;
};

export default class user {
    // Create new user
    async createUser(user: User): Promise<User> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'INSERT INTO users (username, password, firstName, lastName) VALUES($1, $2, $3, $4) RETURNING id, username, firstName as "firstName", lastName as "lastName", isActive as "isActive"';
            const values = [user.username, user.password, user.firstName, user.lastName];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during create user: ${user.username}!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
    // Get all users
    async indexUsers(): Promise<User[]> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'SELECT id, username, firstName as "firstName", lastName as "lastName", isActive as "isActive" FROM users';
            const result = await client.query(sql);
            client.release();
            return result.rows;
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: 'Error happened during extract all users from database!',
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
    // Get user by id
    async showUser(id: string): Promise<User | null> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'SELECT id, username, firstName as "firstName", lastName as "lastName", isActive as "isActive" FROM users WHERE id = ($1)';
            const values = [id];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during extract user with id ${id} from database!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
    // Update user by id
    async updateUser(user: User): Promise<User> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'UPDATE users SET username=($1), password=($2), firstName=($3), lastName=($4), isActive=($5) WHERE id=($6) RETURNING id, username, firstName as "firstName", lastName as "lastName", isActive as "isActive"';
            const values = [user.username, user.password, user.firstName, user.lastName, user.isActive, user.id];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during update user with id ${user.id} into database!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
    // Delete user by id
    async deleteUser(id: string): Promise<User | null> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'DELETE FROM users WHERE id=($1) RETURNING id, username, firstName as "firstName", lastName as "lastName", isActive as "isActive"';
            const values = [id];
            const result = await client.query(sql, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during delete user with id ${id} from database!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
    // Authenticate user by id
    async authenticateUser(user: User): Promise<User | null> {
        try {
            const client = await pgConnectionPool.connect();
            const sql =
                'SELECT username, password, firstName as "firstName", lastName as "lastName", isActive as "isActive" FROM users WHERE username = ($1)';
            const values = [user.username];
            const result = await client.query(sql, values);
            client.release();
            if (result.rows.length) {
                if (passwordUtilities.passwordCheck(user.password, result.rows[0].password)) {
                    return result.rows[0];
                }
            }
            return null;
        } catch (error) {
            const customError: myError = {
                error: error,
                message: (error as Error).message,
                customMessage: `Error happened during authenticate user ${user.username}!`,
                HTTPStatusCode: 503,
            };
            throw customError;
        }
    }
}
