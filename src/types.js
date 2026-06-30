/**
 * @file JSDoc type definitions for the Money Tracking app.
 * These types document the shape of data flowing through the application.
 * Use them as reference for AI tools and developers.
 */

/**
 * @typedef {Object} Session
 * @property {string} session_id - UUID session identifier
 */

/**
 * @typedef {Object} Wallet
 * @property {string} id - Wallet unique identifier
 * @property {string} name - Wallet display name
 * @property {number} balance - Current balance in IDR
 * @property {string} [description] - Optional description
 * @property {string} type_wallet_id - Wallet type identifier
 * @property {boolean} showing - Whether to show on main menu card
 */

/**
 * @typedef {Object} WalletCard
 * @property {string} id - Wallet unique identifier
 * @property {string} name - Wallet display name
 * @property {number} balance - Current balance in IDR
 */

/**
 * @typedef {Object} WalletType
 * @property {string} id - Type identifier
 * @property {string} name - Type display name (e.g., "Bank", "E-Wallet")
 */

/**
 * @typedef {Object} Mutation
 * @property {string} id - Mutation unique identifier
 * @property {"credit"|"debit"} type - Transaction type
 * @property {number} nominal - Transaction amount in IDR
 * @property {string} description - Transaction description
 * @property {string} category - Category name
 * @property {string} wallet - Wallet name
 * @property {number} start_balance - Balance before transaction
 * @property {number} end_balance - Balance after transaction
 * @property {string} timestamp - ISO 8601 timestamp
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Category identifier
 * @property {string} name - Category display name
 */

/**
 * @typedef {Object} ApiListResponse
 * @property {Array} list - Array of items
 * @property {number} [total] - Total number of items (for paginated endpoints)
 * @property {number} [total_page] - Total number of pages (for paginated endpoints)
 */

/**
 * @typedef {Object} ApiErrorResponse
 * @property {string} message - Error description
 */

/**
 * @typedef {Object} MutationFilter
 * @property {string} start - Start date in YYYY-MM-DD format
 * @property {string} end - End date in YYYY-MM-DD format
 * @property {number} limit - Items per page (10, 20, or 50)
 * @property {number} page - Page number (1-based)
 */

/**
 * @typedef {Object} AddMutationPayload
 * @property {string} wallet_id - Target wallet ID
 * @property {"credit"|"debit"} type - Transaction type
 * @property {number} nominal - Transaction amount
 * @property {string} description - Transaction description
 * @property {string} category_id - Category ID (or "-" if new)
 * @property {string} category_name - Category name (or "-" if existing)
 * @property {boolean} is_new - Whether creating a new category
 */

/**
 * @typedef {Object} AddWalletPayload
 * @property {string} name - Wallet name
 * @property {number} balance - Initial balance
 * @property {string} description - Wallet description
 * @property {string} type_wallet - Type ID or new type name
 * @property {boolean} is_new - Whether creating a new type
 * @property {boolean} is_showing - Whether to show on main card
 */

/**
 * @typedef {Object} UpdateWalletPayload
 * @property {string} id - Wallet ID to update
 * @property {string} name - Updated name
 * @property {string} description - Updated description
 * @property {string} type_wallet - Type ID or new type name
 * @property {boolean} is_new - Whether creating a new type
 * @property {boolean} is_showing - Whether to show on main card
 */

export default {};
