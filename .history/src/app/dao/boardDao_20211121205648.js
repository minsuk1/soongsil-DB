const { pool } = require("../../../config/database");

// index
async function defaultDao() {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    SELECT *
                    FROM comments`;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}

// 사용자별 좋아요 한 댓글
async function comment_like() {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    SELECT YOUTUBE_USER.Users_id, YOUTUBE_USER.userName, VIDEO_COMMENTS.Texts
                    From YOUTUBE_USER, EMOTION_VIDEOCOMMENT, VIDEO_COMMENTS
                    WHERE YOUTUBE_USER.Users_id= EMOTION_VIDEOCOMMENT.Users_id and 
                    EMOTION_VIDEOCOMMENT.emotion=1 and 
                    EMOTION_VIDEOCOMMENT.Comment_id = VIDEO_COMMENTS.Comment_id;`;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}


// 사용자별 싫어요 한 댓글
async function comment_dislike() {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    SELECT YOUTUBE_USER.Users_id, YOUTUBE_USER.userName, VIDEO_COMMENTS.Texts
                    From YOUTUBE_USER, EMOTION_VIDEOCOMMENT, VIDEO_COMMENTS
                    WHERE YOUTUBE_USER.Users_id= EMOTION_VIDEOCOMMENT.Users_id and 
                    EMOTION_VIDEOCOMMENT.emotion=0 and 
                    EMOTION_VIDEOCOMMENT.Comment_id = VIDEO_COMMENTS.Comment_id;`;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}


// video 1번에 대한 댓글
async function comment(video_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    SELECT VIDEOS.Video_id,
                    VIDEO_COMMENTS.Comment_id,
                    (SELECT Count(*) FROM VIDEO_COMMENTS, VIDEOS WHERE VIDEO_COMMENTS.Video_id = VIDEOS.Video_id and VIDEOS.Video_id = 1) AS '댓글_개수',
                    YOUTUBE_USER.DisplayName AS '댓글_작성자',
                    VIDEO_COMMENTS.Texts As '댓글_내용',
                    VIDEO_COMMENTS.FirstCreated AS '작성_날짜',
                    (SELECT Count(*) FROM EMOTION_VIDEOCOMMENT, VIDEO_COMMENTS, VIDEOS
                    WHERE EMOTION_VIDEOCOMMENT.Comment_id = VIDEO_COMMENTS.Comment_id and EMOTION_VIDEOCOMMENT.Emotion = 1 and VIDEOS.Video_id = 1) AS '댓글_좋아요_개수'
                FROM (YOUTUBE_USER 
                     left join VIDEO_COMMENTS on YOUTUBE_USER.Users_id = VIDEO_COMMENTS.Users_id)
                     left join VIDEOS on VIDEOS.Video_id = VIDEO_COMMENTS.Video_id
                WHERE VIDEOS.Video_id = ?;`;

  const [rows] = await connection.query(Query, video_id)
  connection.release();

  return rows;
}

module.exports = {
  defaultDao,comment_like,comment_dislike,comment
};
