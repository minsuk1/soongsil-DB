module.exports = function(app){
    const board = require('../controllers/boardController');

    //전 게시글 조회
    app.get('/main', board.default);

    
    // 사용자별 좋아요 한 댓글
    app.get('/comments/like', board.comment_like);


    // 사용자별 싫어요 한 댓글
    app.get('/comments/dislike', board.comment_dislike);


    // video 1번에 대한 댓글
    app.get('/comments/:video_id', board.comment);
};
