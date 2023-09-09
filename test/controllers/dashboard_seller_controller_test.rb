require "test_helper"

class DashboardSellerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get dashboard_seller_index_url
    assert_response :success
  end
end
