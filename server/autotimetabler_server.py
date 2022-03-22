import grpc
import concurrent
import json
from concurrent import futures

import autotimetabler_find
import autotimetabler_pb2_grpc
import autotimetabler_pb2


class AutoTimetablerServicer(autotimetabler_pb2_grpc.AutoTimetablerServicer):
    def FindBestTimetable(request, context):
        print('Looking for the best timetable!')
        start = request.start
        end = request.end
        days = request.end
        gap = request.gap
        maxdays = request.maxdays
        periods_list_serialized = request.periods_list_serialized
        data = autotimetabler_find.searchOptimalTimetable(
            start, end, days, gap, maxdays, periods_list_serialized)
        response = autotimetabler_pb2.AutoTimetableResponse()

        response.message = '' if data == None else data
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
