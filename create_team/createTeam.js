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


const { getLine, rl } = require("../utils")
const BREAK_LINE = "========================================"
const GOODBYE = "Goodbye!"
const EXIT_INPUT = 3;
const EXIT = EXIT_INPUT + " .Exit"
const EX1_WAY_1 = "1. Find all the team members 1 Main member, 1 Core member, 1 Reserve member: "


const MAIN_MEMBER = 1;
const CORE_MEMBER = 5;
const RESERVE_MEMBER = 5;
const NORMAL_MEMBER = 29;

const MAX_TEAM_MEMBER = 3;

const MainMemberStartId = 1;
const CoreMemberStartId = MainMemberStartId + MAIN_MEMBER;
const ReserveMemberStartId = CoreMemberStartId + CORE_MEMBER;
const NormalMemberStartId = ReserveMemberStartId + RESERVE_MEMBER;
const MainMemberEndId = CoreMemberStartId - 1;
const CoreMemberEndId = ReserveMemberStartId - 1;
const ReserveMemberEndId = NormalMemberStartId - 1;
const NormalMemberEndId = NormalMemberStartId + NORMAL_MEMBER - 1;
const IdsMember = `
Ids:
- Main ID: ${MainMemberStartId} -> ${MainMemberEndId}
- Core Id: ${CoreMemberStartId} -> ${CoreMemberEndId}
- Reserve ID: ${ReserveMemberStartId} -> ${ReserveMemberEndId}
- Normal ID: ${NormalMemberStartId} -> ${NormalMemberEndId}
`;

const findHowManyWays1 = () => {
    let count = 0;
    let teams = "";
    for (let mainMember = MainMemberStartId; mainMember <= MainMemberEndId; mainMember++) {
        for (let coreMember = CoreMemberStartId; coreMember <= CoreMemberEndId; coreMember++) {
            for (let reserveMember = ReserveMemberStartId; reserveMember <= ReserveMemberEndId; reserveMember++) {
                count++;
                teams += `Team ${count} { Main: ${mainMember}, Core: ${coreMember}, Reserve: ${reserveMember} }\n`;
            }
        }
    }
    return {
        count,
        teams
    };
}

class TeamManager {
    constructor(mainMember, coreMember, reserveMember, normalMember) {
        this.mainMember = mainMember;
        this.coreMember = coreMember;
        this.reserveMember = reserveMember;
        this.normalMember = normalMember;

    }

    updateMainId() {
        this.mainMember = mainMember;
        this.mainStartId = 1;
        this.mainEndId = this.mainStartId + mainMember - 1;
    }

    updateCoreId(coreMember) {
        this.coreMember = coreMember;
        this.coreStartId = this.mainEndId + 1;
        this.coreEndId = this.coreStartId + coreMember - 1;
    }
    updateReserveId(reserveMember) {
        this.reserveMember = reserveMember;
        this.reserveStartId = this.coreEndId + 1;
        this.reserveEndId = this.reserveStartId + reserveMember - 1;
    }
    updateNormalId(normalMember) {
        this.normalMember = normalMember;
        this.normalStartId = this.reserveEndId + 1;
        this.normalEndId = this.normalStartId + normalMember - 1;
    }


}



let displayTeams = (teams, count) => {
    console.log(`Teams: \n${teams}`);
    console.log(`Total ways: ${count}`);
}



const displayTitle = () => {
    console.log(BREAK_LINE)
    console.log(EX1_WAY_1)
    console.log(EXIT)
    console.log(IdsMember)
}

const start = async () => {
    do {
        displayTitle()
        selectInput = await getLine("Please select: ")
        console.log(BREAK_LINE)
        switch (Number(selectInput)) {
            case 1:
                console.log(EX1_WAY_1)
                let { count, teams } = findHowManyWays1();
                displayTeams(teams, count);
                break;
            case EXIT_INPUT:
                console.log(GOODBYE)
                break;
            default:
                console.log("Please select a valid option.");
                break;
        }
        if (selectInput != EXIT_INPUT) {
            await getLine("enter continue to continue...")
        }
    }
    while (selectInput != EXIT_INPUT)
    rl.close()
}

start()
