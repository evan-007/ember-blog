module Api
  module V1
    class PostsController < ApplicationController

      def index
        @posts = Post.all
        render json: @posts, root: false, status: 200, each_serializer: PostSerializer
      end

      def show
        @post = Post.find(params[:id])
        render json: @post, root: false, status: 200, serializer: PostSerializer
      end
    end
  end
end
