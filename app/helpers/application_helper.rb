module ApplicationHelper
  def active_class(link_path)
    active_class = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
    desactive_class = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'

    current_page?(link_path) ? active_class : desactive_class
  end
end
