const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const NodeMediaServer = require('./');


const config = {
  melobee:{
    API_URI:"http://dev.melobee.com:9876",
    CONFIG_MEDIA_STORE : {
      "region": "eu-central-1",
      "endpoint":
        "https://tmi3kx5q2dg2vw.data.mediastore.eu-central-1.amazonaws.com",
      "s3BucketEndpoint": "melobeemusic-content-develop"
    },
  },
  logType:3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    webroot: './www',
    allow_origin: '*'
  },
  https: {
    port: 8443,
    key: './privatekey.pem',
    cert: './certificate.pem',
  },
  trans: {
    ffmpeg: ffmpegPath,
    tasks: [
      {
        app: 'live',
        hls: false,
        hlsFlags: '[hls_time=2:hls_list_size=0]',
        //acParam:['-f' , 'hls' , '-method', 'PUT', 'http://localhost:8000/index.m3u8'],
        //acParam: ['-f' , 'hls' , '-hls_list_size','0','-method', 'PUT'],
        putParam:['-f' , 'hls' , '-hls_list_size','0','-method', 'PUT'],
        putUrl:'http://localhost:8000/{streamName}/{videoId}/index.m3u8',
        //name: 'stream_high'
      }
    ]
  },
  // auth: {
  //   api: true,
  //   api_user: 'admin',
  //   api_pass: 'admin',
  //   play: false,
  //   publish: false,
  //   secret: 'nodemedia2017privatekey'
  // },
};


let nms = new NodeMediaServer(config)
nms.run();

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

