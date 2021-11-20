const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

const channelDao = require('../dao/channelDao');


// 유튜브 동영상(id=1)을 클릭했을 때, 나오는 화면
exports.default = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const user_id = req.params.user_id;
            const rows = await channelDao.defaultDao(user_id);
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

// '예고편' 검색시 뜨는 페이지
exports.expected = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const rows = await channelDao.defaultDao();
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
