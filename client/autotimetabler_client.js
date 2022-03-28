const grpc = require('grpc');
const messages = require('./autotimetabler_pb');
const services = require('./autotimetabler_grpc_pb');
const { stringToSubchannelAddress } = require('@grpc/grpc-js/build/src/subchannel-address');

data = {
  start: 9,
  end: 19,
  days: "134",
  gap: 1,
  maxdays: 2,
  periods_list_serialized: 
  `[
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
  ]` 
}


function main() {
    var client = new services.AutoTimetablerClient(
        'localhost:50051', grpc.credentials.createInsecure());
    var autoTimetableRequest = new messages.TimetableConstraints();
    autoTimetableRequest.setStart(data['start']);
    autoTimetableRequest.setEnd(data['end']); 
    autoTimetableRequest.setDays(data['days']); 
    autoTimetableRequest.setGap(data['gap']); 
    autoTimetableRequest.setMaxdays(data['max']);
    autoTimetableRequest.setPeriodsListSerialized(data['periods_list_serialized'])
    client.findBestTimetable(autoTimetableRequest, (err, res) => {
        if (err) {
            console.log('error was found: ' + err);
        } else { 
            const times = res.getTimesList()
            days = ['na', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
            if (res) {
            const courses = ['course1', 'course2', 'course3']
            console.log(times.map((time, i) => courses[i] + ': ' + days[Math.floor(time / 100)] + ' ' + ((time % 100) / 2).toString()))
          }
        }
    })


}


main();