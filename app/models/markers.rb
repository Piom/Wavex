class Markers < ActiveRecord::Base
  validates :name,  :presence => true
  validates :latitude,  :presence => true
  validates :longitude, :presence => true
  scope :for_front_page , limit(5).order("created_at DESC")
end
