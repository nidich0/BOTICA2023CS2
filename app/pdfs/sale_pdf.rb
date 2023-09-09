class SalePdf < Prawn::Document

    def initialize(sale,view)
        super(top_margin: 70)
        @sale = sale
        @view = view
        contenido
        # prueba
    end
    def contenido
        text "Factura ", size: 30, style: :bold, align: :left, color: "000000",underline: true,leading: 10, character_spacing: 5,
        text "Cliente: " + @sale.client.name, size: 15, style: :bold, align: :left , color: "000000",leading: 10, character_spacing: 5
        text "Factura N°: " + @sale.id.to_s, size: 15, style: :bold, align: :left, color: "000000",leading: 10, character_spacing: 5
        text "Productos: ", size: 15, style: :bold, align: :left, color: "000000",leading: 10, character_spacing: 5
        @sale.sales_details.each do |sale_detail|
        text "Producto: " + sale_detail.product.name + " Cantidad:" + sale_detail.quantity.to_s, size: 10, style: :bold, align: :left, color: "000000",leading: 10, character_spacing: 5
        text "Precio: " + sale_detail.product.price.to_s, size: 10, style: :bold, align: :left, color: "000000",leading: 10, character_spacing: 5
        end
        text "Total: " + @sale.total.to_s, size: 15, style: :bold, align: :center, color: "000000",leading: 10, character_spacing: 5
        text "Fecha: " + @sale.created_at.to_s, size: 15, style: :bold, align: :left, color: "000000",leading: 10, character_spacing: 5
    end

    # def prueba
    #     table ([["Producto","Cantidad"],["Precio"]]) 
    # end


end