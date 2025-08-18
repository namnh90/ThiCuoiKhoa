
let batdaugame = false;
let lichsuchoi = 1
document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") dichuyen("up");
    if (e.key === "ArrowDown") dichuyen("down");
    if (e.key === "ArrowLeft") dichuyen("left");
    if (e.key === "ArrowRight") dichuyen("right");
});
let count_move = 1;
function dichuyen(huong) {
    if (!batdaugame) return;
    const list_all_box = document.querySelectorAll('[class^="cell-2-1-1-box-game"]');
    for (const box of list_all_box) {
        if (box.textContent.trim() === "12") {
            box_mau_den = box;
            break;
        }
    }
    let oldX = Number(box_mau_den.getAttribute("x"))
    let oldY = Number(box_mau_den.getAttribute("y"))
    let newX = oldX
    let newY = oldY
    if (huong === "up") newX--;
    if (huong === "down") newX++;
    if (huong === "left") newY--;
    if (huong === "right") newY++;
    if (newX < 1 || newX > 4 || newY < 1 || newY > 4) return;

    for (const box of list_all_box) {
        if (Number(box.getAttribute("x")) === newX && Number(box.getAttribute("y")) === newY) {
            box_target = box;
            break;
        }
    }

    box_mau_den.textContent = box_target.textContent
    box_mau_den.style.backgroundColor = box_target.style.backgroundColor
    box_mau_den.style.color = box_target.style.color
    box_target.textContent = "12"
    box_target.style.backgroundColor = "black";
    box_target.style.color = "black"
    count_move++
    check_chien_thang();
}
function check_chien_thang() {
    let status = "done"
    const list_all_box_after = document.querySelectorAll('[class^="cell-2-1-1-box-game"]');
    for (let i = 0; i < list_all_box_after.length; i++) {
        let box = list_all_box_after[i];
        if (Number(box.textContent) !== i + 1) { status = "false"; break }
    }
    if (status === "done") {
        if (checkdemgio) {
            clearInterval(checkdemgio);
            checkdemgio = null;
            count_time = doi_gio(sec);
            document.getElementsByClassName('btn-1-1-stop')[0].style.display = "none";
            document.getElementsByClassName('btn-1-1-start')[0].style.display = "";
            batdaugame = false;
            document.getElementsByClassName('text_chien_thang')[0].style.display = "block";
            taodivlichsu();
        }
    }
}

document.getElementsByClassName("btn-1-1-start")[0].addEventListener("click", shuffle)

function shuffle() {
    const list_all_box = document.querySelectorAll('[class^="cell-2-1-1-box-game"]');
    let list_info_cell = []
    for (const box of list_all_box) {
        list_info_cell.push({ so_thu_tu: Number(box.textContent), color: box.style.backgroundColor, colortext: box.style.color })
    };
    function dem_so_nghich_dao(list_info_cell) {
        let count_nghich_dao = 0;
        const numbers = list_info_cell.filter(box => box.so_thu_tu !== 12);
        for (let i = 0; i < numbers.length - 1; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i].so_thu_tu > numbers[j].so_thu_tu) count_nghich_dao++;
            }
        }
        return count_nghich_dao;

    };

    function check_giai_duoc(list_info_cell) {
        const count_nghich_dao = dem_so_nghich_dao(list_info_cell);
        console.log(count_nghich_dao);
        const vitri_black = list_info_cell.findIndex(box => box.so_thu_tu === 12);
        console.log(vitri_black);
        const rowFromBottom = 3 - Math.floor(vitri_black / 4);
        console.log(rowFromBottom);
        console.log((dem_so_nghich_dao(list_info_cell) + rowFromBottom) % 2 === 0)
        return (dem_so_nghich_dao(list_info_cell) + rowFromBottom) % 2 === 0;

    };
    do {
        for (let k = 0; k < 100; k++) {
            const i = Math.floor(Math.random() * 12);
            const j = Math.floor(Math.random() * 12);
            [list_info_cell[i], list_info_cell[j]] = [list_info_cell[j], list_info_cell[i]];
        }
    }

    while (check_giai_duoc(list_info_cell))
        ;
    console.log(!check_giai_duoc(list_info_cell));
    list_all_box.forEach((box, i) => {
        box.textContent = list_info_cell[i].so_thu_tu;
        box.style.backgroundColor = list_info_cell[i].color;
        box.style.color = list_info_cell[i].colortext
    });

}

let sec = 0;
let checkdemgio = null;

function doi_gio(sec) {
    const minutes = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
}

document.getElementsByClassName('btn-1-1-start')[0].addEventListener('click', () => {
    document.getElementsByClassName('btn-1-1-start')[0].style.display = "none";
    document.getElementsByClassName('btn-1-1-stop')[0].style.display = "flex";
    document.getElementsByClassName('text_chien_thang')[0].style.display = "none";
    sec = 0;
    count_move = 1;
    batdaugame = true;
    checkdemgio = setInterval(() => {
        sec++;
        document.getElementsByClassName('timecount')[0].textContent = doi_gio(sec);
    }, 1000);
});

document.getElementsByClassName('btn-1-1-stop')[0].addEventListener('click', () => {
    if (checkdemgio) {
        clearInterval(checkdemgio);
        checkdemgio = null;
        batdaugame = false;
        count_move = 1;
        document.getElementsByClassName('timecount')[0].textContent = "00:00";
        document.getElementsByClassName('btn-1-1-stop')[0].style.display = "none";
        document.getElementsByClassName('btn-1-1-start')[0].style.display = "";
        document.getElementsByClassName('text_chien_thang')[0].style.display = "none";
    }
})

function taodivlichsu() {
    const div = document.createElement("div");
    div.className = "div-3-2-history-play-board-title-table";
    div.style.maxWidth = "1800px";
    div.style.width = "100%";
    div.style.height = "50px";
    div.style.backgroundColor = "transparent";
    div.style.display = "grid";
    div.style.gridTemplateColumns = "1fr 4fr 4fr";
    div.style.gap = "5px";
    const texts = [`${lichsuchoi}`, `${count_move}`, `${count_time}`];
    lichsuchoi++
    texts.forEach(text => {
        const p = document.createElement("p");
        p.className = "p-3-2-history-play-board-text";
        p.innerText = text;
        p.style.fontWeight = "500";
        p.style.fontSize = "16px";
        p.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        p.style.color = "black";
        p.style.margin = "5px";
        p.style.textAlign = "center";
        div.appendChild(p);
    });

    document.getElementsByClassName('div-3-history-play-board')[0].appendChild(div);
    count_move = 1;
}