import grpc
import concurrent
from concurrent import futures

import autotimetabler_find
import autotimetabler_pb2_grpc
import autotimetabler_pb2


class AutoTimetablerServicer(autotimetabler_pb2_grpc.AutoTimetablerServicer):
    def FindBestTimetable(request, context):
        print('Looking for the best timetable!')
        # request.##### will have your request params
        # need to run ORTools here!
        response = autotimetabler_pb2.AutoTimetableResponse()
        response.message = autotimetabler_find.return_hello()
        return response


def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    autotimetabler_pb2_grpc.add_AutoTimetablerServicer_to_server(
        AutoTimetablerServicer, server)
    server.add_insecure_port('[::]:9995')
    server.start()
    print('Autotimetabling server is running!')
    server.wait_for_termination()


main()
