const grpc = require('grpc');
const messages = require('./autotimetabler_pb');
const services = require('./autotimetabler_grpc_pb');

function main() {
    const client = new services.AutoTimetablerClient(
        'localhost:9995', grpc.credentials.createInsecure());
    const autoTimetableRequest = new messages.TimetableConstraints();
    autoTimetableRequest.setStart = 1;
    autoTimetableRequest.setEnd = 2; 
    autoTimetableRequest.setDays = 3; 
    autoTimetableRequest.setGap = 4; 
    autoTimetableRequest.setMaxDays = 5;
    autoTimetableRequest.setPeriodsListSerialized = '[test]'
    client.findBestTimetable(autoTimetableRequest, (err, res) => {
        if (err) {
            console.log('error was found: ' + err);
        } else { 
            console.log('response from python, ' + res);
        }
    })


}


main();