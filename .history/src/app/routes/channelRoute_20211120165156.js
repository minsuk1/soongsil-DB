module.exports = function(app){
    const channel = require('../controllers/channelController');

    // 유튜브 동영상(id=1)을 클릭했을 때, 나오는 화면 - 동현님
    app.get('/channel/:user_id', channel.default);


    // '예고편' 검색시 뜨는 페이지 - 동현님
    app.get('/channel/expected', channel.expected);

    // QUERY) WATCH_VIDEOS_LATER - 유나님
    app.get('/channel/watch_later', channel.watch_later);

    // QUERY) 좋아요 영상 - 유나님
    app.get('/channel/like_videos', channel.like_videos);
};
