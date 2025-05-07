// - 1 người là thành viên chủ lực 
// - 5 người là đội nòng cốt 
// - 5 người là đội dự bị 
// - 29 người còn lại là thành viên thường
///
// Yêu cầu:
// 1. Tìm tất cả các cách chọn 3 người thỏa mãn:
//    - Bắt buộc phải có thành viên chủ lực
//    - Phải có ít nhất 1 người từ đội nòng cốt
//    - Người còn lại phải là người từ đội dự bị


// Tim tat ca cach chon 

// 2. Các ràng buộc bổ sung:
//    - Trong đội có những cặp bài trùng HLV muốn những người này phải chơi cùng nhau, 
// nhưng có những cặp thì không thể chơi cùng nhau nên ko thể ghép vào 1 đội. 
//    - thêm những ràng buộc này trong quá trình chọn đội. 
//    - HLV có thể thay đổi những điều kiện này trước khi sắp xếp đội hình
const { getLine, rl } = require("./utils")
const BREAK_LINE = "========================================"
const GOODBYE = "Goodbye!"
const EXIT = "1 .Exit"
const EX1_WAY_1 = "2. Find all the team members 1 Main member, 1 Core member, 1 Reserve member: "

const MAIN_MEMBER = 1;
const CORE_MEMBER = 5;
const RESERVE_MEMBER = 5;
const NORMAL_MEMBER = 29;
const MAX_MEMBER = 40;

class Team {
    total;

}

const findHowManyWays1 = (mainMemberMax = MAIN_MEMBER, coreMemberMax = CORE_MEMBER, reserveMemberMax = RESERVE_MEMBER) => {
    let count = 0;
    let teams = "";
    for (let mainMember = 1; mainMember <= mainMemberMax; mainMember++) {
        for (let coreMember = 1; coreMember <= coreMemberMax; coreMember++) {
            for (let reserveMember = 1; reserveMember <= reserveMemberMax; reserveMember++) {
                count++;
                teams += `Team ${count} {Main : M${mainMember}, Core: C${coreMember}, Reserve: R${reserveMember}\n`;
            }
        }
    }
    return {
        count,
        teams
    };
}
let displayTeams = (teams, count) => {
    console.log(`Teams: \n${teams}`);
    console.log(`Total ways: ${count}`);
}



const displayTitle = () => {
    console.log(BREAK_LINE)
    console.log(EXIT)
    console.log(EX1_WAY_1)
}



const start = async () => {

    do {
        displayTitle()
        selectInput = await getLine("Please select: ")
        console.log(BREAK_LINE)
        switch (Number(selectInput)) {
            case 1:
                console.log(GOODBYE)
                break;
            case 2:
                console.log(EX1_WAY_1)
                let { count, teams } = findHowManyWays1();
                displayTeams(teams, count);
                break;
            default:
                console.log("Please select a valid option.");
                break;
        }
        if (selectInput != 1) {
            await getLine("enter continue to continue...")
        }
    }
    while (selectInput != 1)
    rl.close()
}

start()
