
/* Hacky way to get a direct, but temporary MP4 link for a YouTube video 

    Usage: Open YouTube in browser and run code in the dev. console
    
    References:
    https://tyrrrz.me/Blog/Reverse-engineering-YouTube
    https://gist.github.com/el3zahaby/9e60f1ae3168c38cc0f0054c15cd6a83
    http://rg3.github.io/youtube-dl/ https://github.com/rg3/youtube-dl/
    
    const videoInfoRegex = /(?:quality=(\w*?),)(?:type=video\/mp4.*?)&url=(.*?),/g; // find all mp4 links
  */

// FIXME: Doesn't work on copyrighted music, verified accounts, etc. See references for info.
async function extractYoutubeMp4Link(vidId) {
  const regex = /type=video\/mp4.*?&url=(.*?),/; // find first mp4 link
  const findStr = 'url_encoded_fmt_stream_map=';
  const findStrLen = findStr.length;

  const vidInfo = await getVideoInfo(vidId);
  const decodedInfo = decodeURIComponent(decodeURIComponent(vidInfo));
  const streamMap = decodedInfo.substr(decodedInfo.indexOf(findStr) + findStrLen);
  return regex.exec(streamMap)[1];
}

function getVideoInfo(vidId) {
  const url = `https://www.youtube.com/get_video_info?video_id=${vidId}`;
  return fetch(url, {
    mode: "no-cors",
  })
    .then(res => res.text())
    .then(body => body);
}

function getYoutubeMp4Link(vidId) {
  extractYoutubeMp4Link(vidId)
    .then(url => console.log(url))
    .catch(err => console.error(err));
}

// example
var ytVideoId = '5FKMTt2Yz60'
getYoutubeMp4Link(ytVideoId);
