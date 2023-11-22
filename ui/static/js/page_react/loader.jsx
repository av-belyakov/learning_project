export default async function loader(params) {
    console.log("func 'loader'")
    console.log(params)

    let str = ''
    for (let v in params) {
        str += `${v}=${params[v]}&`
    }

    console.log(str)

    return fetch(`http://${window.location.host}/examples_react/api?${str}`)
}
