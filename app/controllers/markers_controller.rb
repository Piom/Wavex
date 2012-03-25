class MarkersController < ApplicationController
  def index
    @markers = Markers.all
    respond_to do |format|
      format.json { render :json => @markers}
    end
  end

  def show
    @marker = Markers.find(params[:marker_id])
    respond_to do |format|
      format.html
      format.json {render :json => @marker}
    end
  end

  def create
    @marker = Markers.new(:name=>params[:name],:longitude=>params[:longitude],:latitude=>params[:latitude])
    if @marker.save
      @message="Save complete"
    else
      @message="Error save"
    end
    respond_to do |format|
      format.json {render :json => @message}
    end
  end
end
