module.exports = function(app){
    const channel = require('../controllers/channelController');

    // 유튜브 동영상(id=1)을 클릭했을 때, 나오는 화면
    app.get('/channel/:user_id', channel.default);


    // '예고편' 검색시 뜨는 페이지
    app.post('/channel/expected', channel.expected);

};
