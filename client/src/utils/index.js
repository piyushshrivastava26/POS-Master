export const getAvatarName = (name) => {
    if(!name){
        return
    }

    return name.split(" ").map(word => word[0]).join("").toUpperCase()
}


export const formatDateAndTime = (data) => {

    const dateAndTime = new Date(data).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    })

    return dateAndTime
}