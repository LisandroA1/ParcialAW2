export const recipe = (title, ing)=>{
    return `
    <li>
        <h3 class="text-slate-900 text-xl font-semibold">${title}</h3>
        <ul class="px-5 py-2 list-disc">
            ${
                ing.map(e=>(
                    `<li class="text-slate-800">${e.name} ${e.quantity}</li>`
                )).join('')
            }
        </ul>
    </li>
    `
}