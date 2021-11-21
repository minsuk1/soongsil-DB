const { pool } = require("../../../config/database");



// //게시글 조회(세부)
// async function defaultDao(findVideosInfoParams) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     //const user_id = req.params.user_id;
//     const selectEmailQuery = 
//                       `
//                       select * from VIDEOS;
//                      `;
  
//     const [rows] = await connection.query(selectEmailQuery,
//                                   findVideosInfoParams)
//     connection.release();
  
//     return rows;
//   }


  

// // '예고편' 검색시 뜨는 페이지
// async function expected() {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const Query = 
//                     `
//                     SELECT V.Title, U.UserName, V.TotalView, V.Descriptions, DATEDIFF(DD, V.FirstCreated, GETDATE()) AS '일차이'
//                     FROM VIDEOS AS V INNER JOIN YOUTUBE_USER AS U ON V.Users_id = U.Users_id
//                     WHERE Title LIKE '%예고편%'
//                     ORDER BY TotalView DESC;
//          `;

//   const [rows] = await connection.query(Query)
//   connection.release();

//   return rows;
// }



// // QUERY) WATCH_VIDEOS_LATER - 유나님
// async function watch_later() {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const Query = 
//                     `
//                     SELECT WATCH_VIDEOS_LATER.Video_id, YOUTUBE_USER.displayName, VIDEOS.Title, VIDEOS.FileURL, VIDEOS.FirstCreated
//                     FROM YOUTUBE_USER
//                     join WATCH_VIDEOS_LATER on YOUTUBE_USER.Users_id=WATCH_VIDEOS_LATER.Users_id
//                       join VIDEOS on WATCH_VIDEOS_LATER.Video_id=VIDEOS.Video_id
//                         WHERE YOUTUBE_USER.Users_id=1;
                    
//          `;

//   const [rows] = await connection.query(Query)
//   connection.release();

//   return rows;
// }



// // QUERY) 좋아요 영상 - 유나님
// async function like_videos() {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const Query = 
//                     `
//                     SELECT YOUTUBE_USER.Users_ID, YOUTUBE_USER.UserName, VIDEOS.Title
//                     From YOUTUBE_USER, EMOTION_VIDEOS, VIDEOS
//                     WHERE YOUTUBE_USER.Users_ID= EMOTION_VIDEOS.Users_ID and 
//                     EMOTION_VIDEOS.emotion=1 and 
//                     EMOTION_VIDEOS.Video_id= VIDEOS.Video_id;
//          `;

//   const [rows] = await connection.query(Query)
//   connection.release();

//   return rows;
// }


// // QUERY) SUBSCRIPTION - 유나님
// async function subscription() {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const Query = 
//                     `
//                     SELECT s.Follower_id,u.displayName, v.Title, v.firstcreated
//                     FROM SUBSCRIPTION s
//                       left join YOUTUBE_USER u on s.following_id=u.Users_id
//                         left join VIDEOS v on u.users_id =v.users_id
//                           where u.users_id = 1;
//          `;

//   const [rows] = await connection.query(Query)
//   connection.release();

//   return rows;
// }


// QUERY) totalwatchingview - 유나님
async function totalwatchingview() {
  const connection = await pool.getConnection(async (conn) => conn);
  const Query = 
                    `
                    SELECT Users_ID,username, displayName, totalwatchingview 
                    FROM YOUTUBE_USER 
                    ORDER BY totalwatchingview desc;
         `;

  const [rows] = await connection.query(Query)
  connection.release();

  return rows;
}
// module.exports = {
//   defaultDao,expected,watch_later,like_videos,subscription,totalwatchingview
// };


module.exports = {
watch_later, totalwatchingview
};