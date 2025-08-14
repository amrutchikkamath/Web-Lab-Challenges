def calculate_plank_dimensions
  n = gets.to_i # number of vertices

  # Initialize min and max values
  min_x = Float::INFINITY
  max_x = -Float::INFINITY
  min_y = Float::INFINITY
  max_y = -Float::INFINITY

  # Read vertices and calculate bounding box
  n.times do
    x, y = gets.split.map(&:to_f) # read x and y coordinates
    min_x = [min_x, x].min
    max_x = [max_x, x].max
    min_y = [min_y, y].min
    max_y = [max_y, y].max
  end

  # Calculate dimensions of the rectangular plank
  width = (max_x - min_x).ceil
  height = (max_y - min_y).ceil

  # Print the dimensions in ascending order
  puts [width, height].sort.join(' ')
end

# Start the program
calculate_plank_dimensions