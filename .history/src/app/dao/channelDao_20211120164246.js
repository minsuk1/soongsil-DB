const { pool } = require("../../../config/database");



//게시글 조회(세부)
async function defaultDao(findVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    //const user_id = req.params.user_id;
    const selectEmailQuery = 
                      `
                      SELECT U.DisplayName, V.Title, V.FileURL, V.Descriptions, V.TotalView,
                      (SELECT count(*)  FROM SUBSCRIPTION AS S  WHERE S.Following_id = U.Users_id) AS '구독자_수',
                      (SELECT count(*)  FROM EMOTION_VIDEOS AS E INNER JOIN VIDEOS AS V ON  E.Video_id = V.Video_id  WHERE E.Emotion = 1) AS '좋아요_수',
                      (SELECT count(*)  FROM EMOTION_VIDEOS AS E INNER JOIN VIDEOS AS V ON  E.Video_id = V.Video_id  WHERE E.Emotion = 0) AS '싫어요_수',
                      (SELECT STUFF((SELECT CAST(',' AS VARCHAR(MAX)) + TagName  FROM TAG_VIDEOS AS TV JOIN VIDEOS AS V ON TV.Video_id = V.Video_id JOIN TAG AS T ON TV.Tag_id = T.Tag_id
                      FOR XML PATH('')), 1, 1, '')) AS 'TAG항목'
                    FROM VIDEOS AS V LEFT JOIN YOUTUBE_USER AS U ON V.Users_id = U.Users_id
                    WHERE V.Video_id = 1;s`;
  
    const [rows] = await connection.query(selectEmailQuery,
                                  findVideosInfoParams)
    connection.release();
  
    return rows;
  }


  

// '예고편' 검색시 뜨는 페이지
async function expected() {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    SELECT V.Title, U.UserName, V.TotalView, V.Descriptions, DATEDIFF(DD, V.FirstCreated, GETDATE()) AS '일차이'
                    FROM VIDEOS AS V INNER JOIN YOUTUBE_USER AS U ON V.Users_id = U.Users_id
                    WHERE Title LIKE '%예고편%'
                    ORDER BY TotalView DESC;
         `;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}


module.exports = {
  defaultDao,expected
};
