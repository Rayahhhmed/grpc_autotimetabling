const grpc = require('grpc');
const messages = require('./autotimetabler_pb');
const services = require('./autotimetabler_grpc_pb');
const { stringToSubchannelAddress } = require('@grpc/grpc-js/build/src/subchannel-address');
require('google-protobuf/google/protobuf/struct_pb')
data = {
  start: 9,
  end: 19,
  days: "134",
  gap: 1,
  maxdays: 2,
  periods: 
  [
    [
      [[5, 11, 12]],
      [[5, 13, 14]],
      [[4, 10, 11]],
      [[4, 14, 15]],
      [[2, 9, 10]],
      [[2, 15, 16]],
      [[3, 12, 13]]
    ],
    [
      [
        [1, 17, 18],
        [4, 17, 18]
      ],
      [
        [1, 17, 18],
        [4, 17, 18]
      ],
      [
        [1, 17, 18],
        [4, 17, 18]
      ],
      [
        [1, 18, 19],
        [4, 18, 19]
      ],
      [
        [2, 9, 10],
        [4, 9, 10]
      ],
      [
        [2, 9, 10],
        [4, 9, 10]
      ],
      [
        [2, 9, 10],
        [4, 9, 10]
      ],
      [
        [2, 12, 13],
        [4, 12, 13]
      ],
      [
        [2, 12, 13],
        [4, 12, 13]
      ],
      [
        [2, 12, 13],
        [4, 12, 13]
      ],
      [
        [2, 15, 16],
        [4, 15, 16]
      ],
      [
        [2, 15, 16],
        [4, 15, 16]
      ],
      [
        [2, 15, 16],
        [4, 15, 16]
      ],
      [
        [3, 11, 12],
        [5, 11, 12]
      ],
      [
        [3, 11, 12],
        [5, 11, 12]
      ],
      [
        [3, 11, 12],
        [5, 11, 12]
      ],
      [
        [3, 14, 15],
        [5, 14, 15]
      ],
      [
        [3, 14, 15],
        [5, 14, 15]
      ],
      [
        [3, 14, 15],
        [5, 14, 15]
      ]
    ],
    [
      [[4, 10, 11]],
      [[4, 10, 11]],
      [[2, 9, 10]],
      [[2, 9, 10]],
      [[2, 9, 10]],
      [[2, 9, 10]],
      [[2, 13, 14]],
      [[2, 13, 14]],
      [[2, 13, 14]],
      [[2, 13, 14]],
      [[3, 11, 12]],
      [[3, 11, 12]],
      [[3, 11, 12]],
      [[3, 11, 12]],
      [[3, 16, 17]],
      [[3, 16, 17]],
      [[3, 16, 17]],
      [[3, 16, 17]]
    ]
  ]
}


function main() {
    var client = new services.AutoTimetablerClient(
        'localhost:9995', grpc.credentials.createInsecure());
    var autoTimetableRequest = new messages.TimetableConstraints([ 9, 19, '134', 1, 2, []]);
    // console.log(autoTimetableRequest)

    // const plainObjStruct = proto.google.protobuf.Struct.fromJavaScript(data); // struct your plain obj

    // autoTimetableRequest.setStart(data['start']);
    // autoTimetableRequest.setEnd(data['end']); 
    // autoTimetableRequest.setDays(data['days']); 
    // autoTimetableRequest.setGap(data['gap']); 
    // autoTimetableRequest.setMaxdays(data['maxdays']);
    // autoTimetableRequest.setPeriodsList([])

    var pg = new messages.TimetableConstraints.Period.Class.PeriodGroup([3, 12, 13])
    var c = new messages.TimetableConstraints.Period.Class()
    c.setPeriodgroupsList([pg])


    var p = new messages.TimetableConstraints.Period()
    p.setClassesList([c])
    // console.log(p)

    // var c = new messages.TimetableConstraints.Period.Class

    autoTimetableRequest.setPeriodsList([p])


    // console.log(autoTimetableRequest.array);



    client.findBestTimetable(autoTimetableRequest, (err, res) => {
        if (err) {
            console.log('error was found: ' + err);
        } else { 
          //   const times = res.getTimesList()
          //   days = ['na', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
          //   if (res) {
          //   const courses = ['course1', 'course2', 'course3']
          //   console.log(times.map((time, i) => courses[i] + ': ' + days[Math.floor(time / 100)] + ' ' + ((time % 100) / 2).toString()))
          // }
        }
    })


}


main();