require 'net/http'
require 'uri'
require 'json'

class ReniecData
  TOKEN = "apis-token-5634.H1xlcaJdgCNcIxPo61I5wDi5yhM4B-2O"

  def self.fetch_reniec_data(dni)
    uri = URI.parse("https://api.apis.net.pe/v2/reniec/dni?numero=#{dni}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(uri.request_uri)
    request['Accept'] = 'application/json'
    request['Authorization'] = "Bearer #{TOKEN}"

    begin
      response = http.request(request)

      if response.is_a?(Net::HTTPSuccess)
        data = JSON.parse(response.body)
        puts 'Reniec Data:', data
        return data
      else
        puts 'Error:', response.body
        return nil
      end
    rescue StandardError => e
      puts 'An error occurred:', e
      return nil
    end
  end
end
