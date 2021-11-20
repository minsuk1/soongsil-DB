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
                    SELECT YOUTUBE_USER.userID, YOUTUBE_USER.userName, VIDEO_COMMENTS.Texts
From YOUTUBE_USER, EMOTION_VIDEOCOMMENT, VIDEO_COMMENTS
WHERE YOUTUBE_USER.userID= EMOTION_VIDEOCOMMENT.userID and 
EMOTION_VIDEOCOMMENT.emotion=1 and 
EMOTION_VIDEOCOMMENT.Comment_id = VIDEO_COMMENTS.Comment_id`;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}


// 사용자별 싫어요 한 댓글
async function comment_dislike() {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    SELECT YOUTUBE_USER.userID, YOUTUBE_USER.userName, VIDEO_COMMENTS.Texts
                    From YOUTUBE_USER, EMOTION_VIDEOCOMMENT, VIDEO_COMMENTS
                    WHERE YOUTUBE_USER.userID= EMOTION_VIDEOCOMMENT.userID and 
                    EMOTION_VIDEOCOMMENT.emotion=0 and 
                    EMOTION_VIDEOCOMMENT.Comment_id = VIDEO_COMMENTS.Comment_id`;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}


// video 1번에 대한 댓글
async function comment() {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    select v.video_id,
    (select count(*) from VIDEO_COMMENTS  c where c.video_id=v.video_id) as AS '댓글_갯수',
    (select YOUTUBE_USER.DisplayName from USER where YOUTUBE_USER.Users_id=c.Users_id) as AS '댓글_단사람',
    c.text as AS '댓글_내용',
    c.createdAt as AS '날짜',
    (select count(*) from EMOTION_VIDEOCOMMENT lv where lv.Comment_id = c.Comment_id and lv.Emotion=1) as '댓글_좋아요_갯수'
    from YOUTUBE_USER 
        left join VIDEOS v on YOUTUBE_USER.Users_id = v.Users_id
            left join VIDEO_COMMENTS c on v.Video_id = c.video_id
                where v.video_id = 1`;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}

module.exports = {
  defaultDao,comment_like,comment_dislike,comment
};
