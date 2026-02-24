import handleResponse from "../utils/response_handler.js";
import {getAppStatsService} from "../db/models/app_stats.model.js";

export const getAppStats = async (req, res, next) => {
    try {
        const stats = await getAppStatsService();
        handleResponse(res, 200, "App Stats fetched successfully.", stats);
    }
    catch (err) {
        next(err);
    }
}