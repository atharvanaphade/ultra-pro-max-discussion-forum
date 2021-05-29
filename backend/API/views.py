from django.db.models.query import QuerySet, prefetch_related_objects
from rest_framework.response import Response
from Users.models import Thread, ThreadPosts, Topic
from django.shortcuts import render
from .serializers import AccountSerializer, TopicSerializer, ThreadSerializer, PostSerializer
from rest_framework import serializers, status, mixins, generics
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User 

# Create your views here.

class CreateUserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializer

class ThreadListCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class ThreadDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class PostCreateListView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = ThreadPosts.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class PostDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = ThreadPosts.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class TopicCreateListView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class TopicDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class ListPostView(generics.ListCreateAPIView, generics.UpdateAPIView):
    queryset = ThreadPosts.objects.all()
    serializer_class = PostSerializer

    def get(self, request, pk, *args, **kwargs):
        thread = Thread.objects.filter(pk=pk).first()
        posts = ThreadPosts.objects.filter(threadID=thread.pk).order_by('-posted_at')
        data = {}
        data['thread'] = {
            'title': str(thread.title),
            'content': str(thread.content),
            'image': str(thread.media),
            'created_at': str(thread.createdAt),
            'created_by': str(thread.userID.userID.username),
            'topic': str(thread.topicID.name),
        }
        data['posts'] = []
        counter = 1
        if posts is not None:
            for post in posts:
                data['posts'].append({
                    'id': str(counter),
                    'content': str(post.content),
                    'posted_by': str(post.userID.username),
                    'posted_at': str(post.posted_at),
                })
                counter += 1
        print(request.user)
        data['userID'] = str(request.user.id)
        return Response(data, status=201)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
