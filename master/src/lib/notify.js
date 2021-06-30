
const notify = (chan, msg) => {
    const m = JSON.parse(msg);

    if (m.bidReport && m.askReport){
        console.log(`
            !!!!ALERT!!!!
            ${chan}
            bid has gone ${m.bidReport.direction} : ${m.bidReport.percentage}%
            ask has gone ${m.askReport.direction} : ${m.askReport.percentage}%
        `)
        return;
    } else if (m.bidReport){
        console.log(`
        !!!!ALERT!!!!
        ${chan}
        bid has gone ${m.bidReport.direction} : ${m.bidReport.percentage}%
    `)
    return;
    } else {
        console.log(`
        !!!!ALERT!!!!
        ${chan}
        ask has gone ${m.askReport.direction} : ${m.askReport.percentage}%
    `)
    return;
    }
}; 


module.exports = notify; 