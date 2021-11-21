const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

const boardDao = require('../dao/boardDao');

//전 게시글 조회
exports.default = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const rows = await boardDao.defaultDao();
            console.log(rows)
            return res.json(rows);
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};


// 사용자별 좋아요 한 댓글
exports.comment_like = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const rows = await boardDao.comment_like();
            console.log(rows)
            return res.json(rows);
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

// 사용자별 싫어요 한 댓글
exports.comment_dislike = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const rows = await boardDao.comment_dislike();
            console.log(rows)
            return res.json(rows);
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};


// video 1번에 대한 댓글
exports.comment = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const video_id = req.params.video_id;
            const rows = await boardDao.comment(video_id);
            console.log(rows)
            return res.json(rows);
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};