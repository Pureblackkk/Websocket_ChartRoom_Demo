from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

def evokeGroup(groupName, type, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(groupName, {'type': type, 'message': message})

class MessageViewSet(ViewSet):
    def create(self, request):
        print(request.body)
        evokeGroup('chat_myRoom', 'chat_message', 'Got it')
        return Response({"status": "Ok"})

