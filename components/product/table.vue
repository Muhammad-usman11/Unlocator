<template>
    <table id="dataTable" class="divide-y divide-gray-300">
        <thead class="bg-gray-50">
        <tr>
            <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" data-priority="4">
                ID
            </th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" data-priority="1">Title</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" data-priority="3">Price</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" data-priority="2">Actions</th>
        </tr>
        </thead>
    </table>
</template>

<script setup>

import 'datatables.net-dt/js/dataTables.dataTables'
import $ from 'jquery'
import useCustomFetch from "~/composables/useCustomFetch";

let table = null;

onUnmounted(() => {
    table.destroy();
})
onMounted(() => {
    table = $('#dataTable').DataTable({
        serverSide: true,
        processing: true,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        ajax: async (data, callback) => {
            const response = await useCustomFetch('/admin/product', {
                query: toQueryObject(data)
            }).then(response => {
                callback(response);
                return response
            });
        },
        pagingType: 'full_numbers',
        language: {
            paginate: {
                first: '<i class="fa-solid fa-backward-fast" aria-hidden="true"></i>',
                previous: '<i class="fa-solid fa-backward-step" aria-hidden="true"></i>',
                next: '<i class="fa-solid fa-forward-step large" aria-hidden="true"></i>',
                last: '<i class="fa-solid fa-forward-fast" aria-hidden="true"></i>'
            }
        },
        columns: [
            {data: 'id', name: "id"},
            {data: 'title', name: "title"},
            {data: 'default_price', name: "default_price"},
            {
                data: function (data) {
                    let actions = data.actions.split(',')
                    let buttons = '<div class="row">';
                    if (actions.includes('edit')) {
                        buttons += '<button class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 product-edit-btn" data-id="' + data.id + '">Edit Product</button>'
                    }
                    buttons += '</div>'
                    return buttons;
                }, name: 'actions', orderable: false
            },
        ],
        responsive: true
    });

    $(document).ready(() => {
        $(document).on('click', '.product-edit-btn', (e) => {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            navigateTo({
                path: `product/${id}/edit`
            })
        });
    });
})

const toQueryObject = (data, nested = null) => {
    let result = {};
    for (const key in data) {
        let value = data[key];
        if (["string", "number", "boolean"].includes((typeof value).toLowerCase())) {
            let temp = {};
            if (nested) {
                let temp_key = nested + "[" + key + "]";
                // @ts-ignore
                temp[temp_key] = value;
            } else {
                // @ts-ignore
                temp[key] = value;
            }
            result = {...result, ...temp};
        } else {
            let temp_key = key;
            if (nested) {
                temp_key = nested + "[" + key + "]";
            }
            let temp = toQueryObject(value, temp_key);
            result = {...result, ...temp};
        }
    }
    return result;
}
</script>

<style scoped>

</style>
