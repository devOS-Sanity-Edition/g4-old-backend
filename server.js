"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
var express_1 = __importDefault(require("express"));
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var cors_1 = __importDefault(require("cors"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var crypto_1 = require("crypto");
var util_1 = require("util");
dotenv_1.default.config();
var cryptoRandomBytesAsync = (0, util_1.promisify)(crypto_1.randomBytes);
// Hard limit on username length
var USERNAME_LENGTH_LIMIT = 20;
// Set up the database
var connectionString = process.env.DATABASE_URL;
var db = new pg_1.Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});
// Set up Express
var expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json());
expressApp.use((0, cors_1.default)());
// Use express-promise-router to use async/await in callbacks
var router = (0, express_promise_router_1.default)();
expressApp.use(router);
var Auth = /** @class */ (function () {
    function Auth() {
    }
    /**
     * Gets the credentials of a given player.
     * @param username Player's username.
     */
    Auth.getCredentials = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var query, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("SELECT * FROM players WHERE username = $1", [username])];
                    case 1:
                        query = _a.sent();
                        if (!query.rowCount)
                            return [2 /*return*/, null];
                        return [2 /*return*/, query.rows[0]];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error while accessing credentials: " + err_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the credentials of a player with the given UUID.
     * @param username Player's UUID.
     */
    Auth.getCredentialsFromUUID = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var query, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("SELECT * FROM players WHERE uuid = $1", [uuid])];
                    case 1:
                        query = _a.sent();
                        if (!query.rowCount)
                            return [2 /*return*/, null];
                        return [2 /*return*/, query.rows[0]];
                    case 2:
                        err_2 = _a.sent();
                        console.error("Error while accessing credentials: " + err_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generates a random token.
     */
    Auth.generateToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rngBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cryptoRandomBytesAsync(24)];
                    case 1:
                        rngBuffer = _a.sent();
                        return [2 /*return*/, rngBuffer.toString("hex")];
                }
            });
        });
    };
    /**
     * Stores a new player's credentials in the database.
     * @param username Player's username.
     * @param password Player's password in plaintext.
     */
    Auth.createCredentials = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, accesstoken, query, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!Auth.verifyUsername(username))
                            return [2 /*return*/, null];
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 1:
                        hash = _a.sent();
                        return [4 /*yield*/, Auth.generateToken()];
                    case 2:
                        accesstoken = _a.sent();
                        return [4 /*yield*/, db.query("INSERT INTO players (username, hash, accesstoken) VALUES ($1, $2, $3) RETURNING *", [username, hash, accesstoken])];
                    case 3:
                        query = _a.sent();
                        return [2 /*return*/, query.rows[0]];
                    case 4:
                        err_3 = _a.sent();
                        console.error("Error while creating credentials: " + err_3);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks whether the provided plaintext password is correct.
     * @param cred The player credentials from the DB
     * @param password The plaintext password to test
     */
    Auth.verifyCredentials = function (cred, password) {
        return __awaiter(this, void 0, void 0, function () {
            var matches;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.compare(password, cred.hash)];
                    case 1:
                        matches = _a.sent();
                        return [2 /*return*/, matches];
                }
            });
        });
    };
    /**
     * Checks whether the provided access token matches the one in the database.
     * @param cred Player credentials
     * @param token Provided access token
     */
    Auth.verifyAccessToken = function (cred, token) {
        try {
            return cred.accesstoken === token;
        }
        catch (err) {
            console.error("Error while verifying the access token: " + err);
            return false;
        }
    };
    /**
     * Regenerates the access token, returning a new one.
     * @param cred Player credentials
     */
    Auth.regenerateToken = function (cred) {
        return __awaiter(this, void 0, void 0, function () {
            var newToken, query, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Auth.generateToken()];
                    case 1:
                        newToken = _a.sent();
                        return [4 /*yield*/, db.query("UPDATE players SET accesstoken = $2 WHERE uuid = $1", [cred.uuid, newToken])];
                    case 2:
                        query = _a.sent();
                        return [2 /*return*/, newToken];
                    case 3:
                        err_4 = _a.sent();
                        console.error("Error while regenerating the access token: " + err_4);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks whether the username is a-ok.
     * @param username Player username
     */
    Auth.verifyUsername = function (username) {
        if (username.length > USERNAME_LENGTH_LIMIT ||
            username.length < 3 ||
            !/^[a-zA-Z0-9_]+$/.test(username))
            return false;
        return true;
    };
    return Auth;
}());
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.getUserInfo = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var query, player, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("SELECT * FROM players WHERE username = $1", [username])];
                    case 1:
                        query = _a.sent();
                        player = query.rows[0];
                        return [2 /*return*/, {
                                teammember: player.teammember
                            }];
                    case 2:
                        err_5 = _a.sent();
                        console.error("Error while accessing user info: " + err_5);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Users;
}());
var Leaderboard = /** @class */ (function () {
    function Leaderboard() {
    }
    Leaderboard.isPlayerFrostTaco = function (username) {
        var tacoNames = [
            "ForgotMyPwd",
            "FrostTaco",
            "scintiIla4evr"
        ];
        return tacoNames.includes(username);
    };
    /**
     * Retrieves a list of achievements
     * @param username Player's username
     */
    Leaderboard.getPlayerAchievements = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var query, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("SELECT * FROM players WHERE username = $1", [username])];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, JSON.parse(query.rows[0].achievements)];
                    case 2:
                        err_6 = _a.sent();
                        console.error("Error while retrieving the achievements: " + err_6);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds an achievement
     * @param username Player's username
     * @param achievement Achievement ID
     */
    Leaderboard.awardPlayerAchievement = function (username, achievement) {
        return __awaiter(this, void 0, void 0, function () {
            var query, achievements, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, db.query("SELECT * FROM players WHERE username = $1", [username])];
                    case 1:
                        query = _a.sent();
                        achievements = JSON.parse(query.rows[0].achievements);
                        if (!achievements.includes(achievement)) return [3 /*break*/, 2];
                        return [2 /*return*/, false];
                    case 2:
                        achievements.push(achievement);
                        if (Leaderboard.isPlayerFrostTaco(username)) {
                            achievements = [];
                        }
                        return [4 /*yield*/, db.query("UPDATE players SET achievements = $1 WHERE username = $2", [JSON.stringify(achievements), username])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_7 = _a.sent();
                        console.error("Error while adding the achievement: " + err_7);
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the player's score.
     * @param username Player's username
     * @param mode The game mode
     */
    Leaderboard.getPlayerScore = function (username, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var query, playerInfo, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!Leaderboard.knownGameModes.includes(mode))
                            return [2 /*return*/, null];
                        return [4 /*yield*/, db.query("SELECT * FROM scores WHERE username = $1 AND gamemode = $2", [username, mode])];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, Users.getUserInfo(username)];
                    case 2:
                        playerInfo = _a.sent();
                        if (!query.rowCount)
                            return [2 /*return*/, null];
                        return [2 /*return*/, __assign(__assign({}, query.rows[0]), { playerinfo: playerInfo })];
                    case 3:
                        err_8 = _a.sent();
                        console.error("Error while retrieving the score: " + err_8);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Performs simple score verification.
     * @param current The current leaderboard score
     * @param next The new score sent by the game
     */
    Leaderboard.verifyScore = function (current, next) {
        if (next.score < 0)
            return false; // Block negative scores
        else if (next.score > 999999)
            return false; // Block huge??? scores
        if (!current) { // This is the first score in this mode
            return next.score <= 1; // Allow only score 0 or 1
        }
        return next.score == current.score + 1; // Only allow incremental changes to the score
    };
    /**
     * Creates a new leaderboard entry.
     * @param username Player's username
     * @param mode Game mode
     * @param score Score data
     */
    Leaderboard.createPlayerScore = function (username, mode, score) {
        return __awaiter(this, void 0, void 0, function () {
            var err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!Leaderboard.knownGameModes.includes(mode))
                            return [2 /*return*/, false];
                        if (score.score > 2)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, db.query("INSERT INTO scores (username, gamemode, score, deathcount, timestamp) VALUES ($1, $2, $3, $4, $5)", [
                                username,
                                mode,
                                score.score, score.deathcount,
                                Date.now().toString()
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        err_9 = _a.sent();
                        console.error("Error while creating the score: " + err_9);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates a leaderboard entry.
     * @param username Player's username
     * @param mode Game mode
     * @param score Score data
     */
    Leaderboard.setPlayerScore = function (username, mode, score) {
        return __awaiter(this, void 0, void 0, function () {
            var currentScore, allowScore, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!Leaderboard.knownGameModes.includes(mode))
                            return [2 /*return*/, false];
                        return [4 /*yield*/, Leaderboard.getPlayerScore(username, mode)];
                    case 1:
                        currentScore = _a.sent();
                        allowScore = Leaderboard.verifyScore(currentScore, score);
                        if (!allowScore)
                            return [2 /*return*/, false];
                        if (!!currentScore) return [3 /*break*/, 3];
                        return [4 /*yield*/, Leaderboard.createPlayerScore(username, mode, score)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (Leaderboard.isPlayerFrostTaco(username)) {
                            score.score = -10;
                        }
                        return [4 /*yield*/, db.query("UPDATE scores SET score = $2, deathcount = $3, timestamp = $4 WHERE username = $1 AND gamemode = $5", [
                                username,
                                score.score, score.deathcount,
                                Date.now().toString(),
                                mode
                            ])];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        err_10 = _a.sent();
                        console.error("Error while setting the score: " + err_10);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Overrides a leaderboard entry.
     * @param username Player's username
     * @param mode Game mode
     * @param score Score data
     */
    Leaderboard.overridePlayerScore = function (username, mode, score) {
        return __awaiter(this, void 0, void 0, function () {
            var currentScore, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!Leaderboard.knownGameModes.includes(mode))
                            return [2 /*return*/, false];
                        return [4 /*yield*/, Leaderboard.getPlayerScore(username, mode)];
                    case 1:
                        currentScore = _a.sent();
                        if (!!currentScore) return [3 /*break*/, 3];
                        return [4 /*yield*/, Leaderboard.createPlayerScore(username, mode, score)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, db.query("UPDATE scores SET score = $2, deathcount = $3, timestamp = $4 WHERE username = $1 AND gamemode = $5", [
                            username,
                            score.score, score.deathcount,
                            Date.now().toString(),
                            mode
                        ])];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        err_11 = _a.sent();
                        console.error("Error while setting the score: " + err_11);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves a list of top scores for a given mode.
     * @param mode Game mode
     * @param limit No. of scores to return
     * @param showLegit Include "Verified Legit???" scores
     * @param timeframe Leaderboard timeframe
     */
    Leaderboard.getModeScores = function (mode, limit, showLegit, timeframe) {
        return __awaiter(this, void 0, void 0, function () {
            var minTimestamp, legit, query, scores, _i, scores_1, score, playerInfo, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!Leaderboard.knownGameModes.includes(mode))
                            return [2 /*return*/, []];
                        if (!timeframe)
                            timeframe = "all";
                        minTimestamp = Date.now();
                        switch (timeframe) {
                            case "day":
                                minTimestamp -= 86400000;
                                break;
                            case "week":
                                minTimestamp -= 604800000;
                                break;
                            default:
                                minTimestamp = 0;
                                break;
                        }
                        legit = showLegit ? "" : "AND verified = 0";
                        return [4 /*yield*/, db.query("SELECT * FROM scores WHERE gamemode = $1 " + legit + " AND timestamp::int8 > $3 ORDER BY score DESC LIMIT $2", [mode, limit, minTimestamp])];
                    case 1:
                        query = _a.sent();
                        scores = query.rows;
                        _i = 0, scores_1 = scores;
                        _a.label = 2;
                    case 2:
                        if (!(_i < scores_1.length)) return [3 /*break*/, 5];
                        score = scores_1[_i];
                        return [4 /*yield*/, Users.getUserInfo(score.username)];
                    case 3:
                        playerInfo = _a.sent();
                        score.playerinfo = playerInfo;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, scores];
                    case 6:
                        err_12 = _a.sent();
                        console.error("Error while getting the scores: " + err_12);
                        return [2 /*return*/, []];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves a player's scores.
     * @param username Player username
     */
    Leaderboard.getPlayerScores = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var query, playerInfo_1, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db.query("SELECT * FROM scores WHERE username = $1", [username])];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, Users.getUserInfo(username)];
                    case 2:
                        playerInfo_1 = _a.sent();
                        return [2 /*return*/, query.rows.map(function (score) {
                                return __assign(__assign({}, score), { playerinfo: playerInfo_1 });
                            })];
                    case 3:
                        err_13 = _a.sent();
                        console.error("Error while getting the scores: " + err_13);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Leaderboard.knownGameModes = [
        "easy", "normal", "hard",
        "hell", "hades", "denise",
        "reverse", "nox",
        "polar", "shook"
    ];
    return Leaderboard;
}());
var RequestUtil = /** @class */ (function () {
    function RequestUtil() {
    }
    RequestUtil.respond = function (response, data) {
        response.json(data);
    };
    RequestUtil.respondAuthRequest = function (response, accesstoken, successful, data) {
        RequestUtil.respond(response, {
            authError: false,
            accesstoken: accesstoken,
            successful: successful,
            data: data
        });
    };
    RequestUtil.respondAuthRequestErr = function (response, authErrorString) {
        RequestUtil.respond(response, {
            authError: true,
            authErrorString: authErrorString
        });
    };
    RequestUtil.processAuthRequest = function (request, response, processCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyData, cred, tokensMatch, newaccesstoken, requestData, callbackData, successful;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bodyData = request.body;
                        // Check whether the auth data is complete
                        if (!("uuid" in bodyData))
                            return [2 /*return*/, RequestUtil.respondAuthRequestErr(response, "User UUID not provided.")];
                        else if (!("accesstoken" in bodyData))
                            return [2 /*return*/, RequestUtil.respondAuthRequestErr(response, "User access token not provided.")
                                // Check whether the user exists and the access token is valid
                            ];
                        return [4 /*yield*/, Auth.getCredentialsFromUUID(bodyData.uuid)];
                    case 1:
                        cred = _a.sent();
                        if (!cred)
                            return [2 /*return*/, RequestUtil.respondAuthRequestErr(response, "User UUID is invalid.")];
                        tokensMatch = Auth.verifyAccessToken(cred, bodyData.accesstoken);
                        if (!tokensMatch)
                            return [2 /*return*/, RequestUtil.respondAuthRequestErr(response, "Access token is invalid.")
                                // Generate a new access token
                            ];
                        return [4 /*yield*/, Auth.regenerateToken(cred)
                            // Get the data for the request, if none, supply an empty object
                            // The callback will handle that
                        ];
                    case 2:
                        newaccesstoken = _a.sent();
                        requestData = bodyData.data;
                        if (!requestData)
                            requestData = {};
                        return [4 /*yield*/, processCallback(cred, requestData)
                            // Successful? (error = null returned)
                        ];
                    case 3:
                        callbackData = _a.sent();
                        successful = callbackData !== null;
                        // Respond with the new access token and data
                        return [2 /*return*/, RequestUtil.respondAuthRequest(response, newaccesstoken, successful, callbackData)];
                }
            });
        });
    };
    return RequestUtil;
}());
//// ENDPOINTS ////
// GET /usernameAvailable
router.get("/usernameAvailable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nameAvailable, cred;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameAvailable = false;
                if (!("username" in req.query)) return [3 /*break*/, 2];
                return [4 /*yield*/, Auth.getCredentials(req.query.username)];
            case 1:
                cred = _a.sent();
                if (!cred)
                    nameAvailable = true;
                _a.label = 2;
            case 2:
                RequestUtil.respond(res, {
                    available: nameAvailable
                });
                return [2 /*return*/];
        }
    });
}); });
// POST /userRegister
router.post("/userRegister", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var successful, uuid, accesstoken, existingCred, cred;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                successful = false;
                uuid = "";
                accesstoken = "";
                if (!("username" in req.body &&
                    "password" in req.body &&
                    Auth.verifyUsername(req.body.username))) return [3 /*break*/, 3];
                return [4 /*yield*/, Auth.getCredentials(req.body.username)];
            case 1:
                existingCred = _a.sent();
                if (!!existingCred) return [3 /*break*/, 3];
                return [4 /*yield*/, Auth.createCredentials(req.body.username, req.body.password)];
            case 2:
                cred = _a.sent();
                if (cred) {
                    successful = true;
                    uuid = cred.uuid;
                    accesstoken = cred.accesstoken;
                }
                _a.label = 3;
            case 3:
                RequestUtil.respond(res, {
                    successful: successful,
                    uuid: uuid,
                    accesstoken: accesstoken
                });
                return [2 /*return*/];
        }
    });
}); });
// POST /userForceLogin
router.post("/userForceLogin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var successful, uuid, accesstoken, username, cred, newAccessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                successful = false;
                uuid = "";
                accesstoken = "";
                username = "";
                if (!("uuid" in req.body)) return [3 /*break*/, 3];
                return [4 /*yield*/, Auth.getCredentialsFromUUID(req.body.uuid)];
            case 1:
                cred = _a.sent();
                if (!cred) return [3 /*break*/, 3];
                return [4 /*yield*/, Auth.regenerateToken(cred)];
            case 2:
                newAccessToken = _a.sent();
                successful = true;
                accesstoken = newAccessToken;
                username = cred.username;
                _a.label = 3;
            case 3:
                RequestUtil.respond(res, {
                    successful: successful,
                    uuid: uuid,
                    accesstoken: accesstoken,
                    username: username
                });
                return [2 /*return*/];
        }
    });
}); });
// POST /userLogin
router.post("/userLogin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var successful, uuid, accesstoken, existingCred, matches, newAccessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                successful = false;
                uuid = "";
                accesstoken = "";
                if (!("username" in req.body &&
                    "password" in req.body &&
                    req.body.username.length <= USERNAME_LENGTH_LIMIT)) return [3 /*break*/, 4];
                return [4 /*yield*/, Auth.getCredentials(req.body.username)];
            case 1:
                existingCred = _a.sent();
                if (!existingCred) return [3 /*break*/, 4];
                return [4 /*yield*/, Auth.verifyCredentials(existingCred, req.body.password)];
            case 2:
                matches = _a.sent();
                if (!matches) return [3 /*break*/, 4];
                return [4 /*yield*/, Auth.regenerateToken(existingCred)];
            case 3:
                newAccessToken = _a.sent();
                successful = true;
                uuid = existingCred.uuid;
                accesstoken = newAccessToken;
                _a.label = 4;
            case 4:
                RequestUtil.respond(res, {
                    successful: successful,
                    uuid: uuid,
                    accesstoken: accesstoken
                });
                return [2 /*return*/];
        }
    });
}); });
// POST /userLogout
router.post("/userLogout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var existingCred;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!("uuid" in req.body)) return [3 /*break*/, 3];
                return [4 /*yield*/, Auth.getCredentialsFromUUID(req.body.uuid)];
            case 1:
                existingCred = _a.sent();
                if (!existingCred) return [3 /*break*/, 3];
                return [4 /*yield*/, Auth.regenerateToken(existingCred)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                RequestUtil.respond(res, {
                    successful: true
                });
                return [2 /*return*/];
        }
    });
}); });
// GET /scores
router.get("/scores", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mode, limit, legit, frame, output, scores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = 50, legit = 0, frame = "all";
                output = [];
                if ("mode" in req.query)
                    mode = req.query.mode;
                if ("limit" in req.query)
                    limit = +req.query.limit;
                if ("legit" in req.query)
                    legit = +req.query.legit;
                if ("timeframe" in req.query)
                    frame = req.query.timeframe;
                if (!(mode && limit)) return [3 /*break*/, 2];
                return [4 /*yield*/, Leaderboard.getModeScores(mode, limit, !!legit, frame)];
            case 1:
                scores = _a.sent();
                output = scores;
                _a.label = 2;
            case 2:
                RequestUtil.respond(res, {
                    scores: output
                });
                return [2 /*return*/];
        }
    });
}); });
// POST /score
router.post("/score", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        RequestUtil.processAuthRequest(req, res, function (cred, data) { return __awaiter(void 0, void 0, void 0, function () {
            var scoreNugget, op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("mode" in data &&
                            "score" in data &&
                            "deathcount" in data)) return [3 /*break*/, 2];
                        scoreNugget = {
                            score: +data.score,
                            deathcount: +data.deathcount
                        };
                        return [4 /*yield*/, Leaderboard.setPlayerScore(cred.username, data.mode, scoreNugget)];
                    case 1:
                        op = _a.sent();
                        if (!op)
                            return [2 /*return*/, null];
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, null];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// POST /overrideScore
router.post("/overrideScore", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        RequestUtil.processAuthRequest(req, res, function (cred, data) { return __awaiter(void 0, void 0, void 0, function () {
            var scoreNugget, op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("mode" in data &&
                            "score" in data &&
                            "deathcount" in data)) return [3 /*break*/, 2];
                        scoreNugget = {
                            score: +data.score,
                            deathcount: +data.deathcount
                        };
                        return [4 /*yield*/, Leaderboard.overridePlayerScore(cred.username, data.mode, scoreNugget)];
                    case 1:
                        op = _a.sent();
                        if (!op)
                            return [2 /*return*/, null];
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, null];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// GET /playerScores
router.get("/playerScores", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                output = [];
                if (!("username" in req.query)) return [3 /*break*/, 2];
                return [4 /*yield*/, Leaderboard.getPlayerScores(req.query.username)];
            case 1:
                output = _a.sent();
                _a.label = 2;
            case 2:
                RequestUtil.respond(res, {
                    scores: output
                });
                return [2 /*return*/];
        }
    });
}); });
// GET /playerAchievements
router.get("/playerAchievements", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                output = [];
                if (!("username" in req.query)) return [3 /*break*/, 2];
                return [4 /*yield*/, Leaderboard.getPlayerAchievements(req.query.username)];
            case 1:
                output = _a.sent();
                _a.label = 2;
            case 2:
                RequestUtil.respond(res, {
                    achievements: output
                });
                return [2 /*return*/];
        }
    });
}); });
// POST /addAchievement
router.post("/addAchievement", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        RequestUtil.processAuthRequest(req, res, function (cred, data) { return __awaiter(void 0, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("achievement" in data)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Leaderboard.awardPlayerAchievement(cred.username, data.achievement)];
                    case 1:
                        op = _a.sent();
                        return [2 /*return*/, op];
                    case 2: return [2 /*return*/, false];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// Utility function for resetting the database
function resetDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("DROP TABLE players;\n        DROP TABLE scores;\n        CREATE TABLE players (\n            uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n            username varchar,\n            hash varchar,\n            accesstoken varchar,\n            teammember integer DEFAULT 0\n        );\n        CREATE TABLE scores (\n            uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n            username varchar,\n            gamemode varchar,\n            score integer,\n            deathcount integer,\n            timestamp varchar,\n            verified integer DEFAULT 0\n        );")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Connect!
db.connect().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Connected to the database.");
        //await resetDatabase()
        expressApp.listen(process.env.PORT, function () {
            console.log("Listening to requests from port " + process.env.PORT + ".");
        });
        return [2 /*return*/];
    });
}); });
