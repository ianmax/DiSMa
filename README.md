many-to-many:
banyak item punya banyak pembeli
banyak item punya banyak suppliers

table supplier:
* id supplier
* nama supplier
* contact supplier

table item:
* id item
* jumlah item
* nama item
* harga item

table pembeli:
* id pembeli
* nama pembeli
* contact pembeli

table Customer_item (conjunction):
* id conjunction AS id
* id pembeli AS customersId
* id item AS itemsId

table Supplier_item (conjunction):
* id conjunction AS id
* id supplier AS SupplierId
* id item AS ItemId
* harga item AS item_price

routing:

customers: (login session: admin)
* list customers (routing: /customers)
* add customers (routing: /customers/add)
* edit customers (routing: /customers/edit/:id)
* view items in customers cart (routing: /customers/:id/viewCart)

suppliers: (login session: admin)
* list suppliers (routing: /suppliers)
* add suppliers (routing: /suppliers/add)
* edit suppliers (routing: /suppliers/edit/:id)
* delete suppliers (routing: /suppliers/delete/:id)

items: (login session: admin)
* list items (routing: /items)
* add items (routing: /items/add)
* edit items (routing: /items/edit/:id)
* delete items (routing: /items/delete/:id)

marketplace: (login session: customer)
* list items (routing: /marketplace)
* add to cart (routing: /marketplace/customers/:id/addToCart)
* view cart (routing: /marketplace/customers/:id/viewCart)
* edit cart --> populate all item name: dropdown, qty: manual input (routing: /marketplace/customers/:id/editCart)
* delete item in cart (routing: /marketplace/customers/:id/editCart/deleteItem/:idItem)

admin panel: (login session: admin)
* data transaksi (pilih: per hari, minggu, bulan)
* jumlah qty terjual berdasarkan data transaksi
* jumlah revenue berdasarkan data transaksi
* jumlah profit berdasarkan data transaksi
* send report via email (pdf format)

workflow:
* suppliers ==> membuat supply order == > qty gudang akan bertambah sesuai supply order, kalau sudah supply akan masuk supply notif ke admin gudang (email isinya: items yg disupply beserta qty penambahannya)
* admin inventory ==> terima barang, oper ke pembeli, kalau barang habis ==> notifikasi email dan bisa request ke supplier (supplier akan dapat email notif)
* pembeli ==> membuat purchase order ==> qty gudang akan berkurang sesuai order, kalau sudah order akan masuk order notif ke admin gudang (email isinya: items yg diorder beserta qty nya)

tables:
* customers_item (conjunction)
* suppliers_item (conjunction) ==> tambahin column harga supplier
* items
* customers
* suppliers
* users (data login)

mvp:
* email notif jika ada request supply (notif masuk ke email supplier)
* email notif jika ada request order (notif masuk ke email admin)
* email notif jika inventory dibawah minimum inventory (alert ke admin)
* report / dashboard transaksi per bulan (total qty terjual, total revenue, total profit)
