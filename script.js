"use strict";

const menuItems = [
  {
    id: 1,
    name: "คลาวด์ ลาเต้",
    category: "coffee",
    price: 95,
    description: "เอสเปรสโซหอมเข้ม ผสานนมสดเนียนนุ่ม",
    image: "photo-1461023058943-07fcbe16d735",
    options: "ร้อน / เย็น"
  },
  {
    id: 2,
    name: "อเมริกาโน่",
    category: "coffee",
    price: 80,
    description: "กาแฟดำรสกลมกล่อม หอมกลิ่นเมล็ดกาแฟ",
    image: "photo-1510707577719-ae7c14805e3a",
    options: "ร้อน / เย็น"
  },
  {
    id: 3,
    name: "คาราเมล มัคคิอาโต้",
    category: "coffee",
    price: 110,
    description: "กาแฟและนมสด เติมความหวานหอมด้วยคาราเมล",
    image: "photo-1461023058943-07fcbe16d735",
    options: "ร้อน / เย็น"
  },
  {
    id: 4,
    name: "มัทฉะ ลาเต้",
    category: "tea",
    price: 115,
    description: "มัทฉะเข้มข้น ผสานนมสด หอมละมุนทุกจิบ",
    image: "photo-1515823064-d6e0c04616a7",
    options: "ร้อน / เย็น"
  },
  {
    id: 5,
    name: "ชาไทยนมสด",
    category: "tea",
    price: 85,
    description: "ชาไทยหอม ๆ รสหวานมัน กลมกล่อมลงตัว",
    image: "photo-1558857563-b371033873b8",
    options: "เย็น"
  },
  {
    id: 6,
    name: "ชามะนาว",
    category: "tea",
    price: 80,
    description: "ชาดำกับมะนาวสด เปรี้ยวหวานชื่นใจ",
    image: "photo-1513558161293-cdaf765edfd7",
    options: "เย็น"
  },
  {
    id: 7,
    name: "สตรอว์เบอร์รี ชอร์ตเค้ก",
    category: "cake",
    price: 145,
    description: "เค้กวานิลลาเนื้อนุ่ม ครีมสดและสตรอว์เบอร์รี",
    image: "photo-1464305795204-6f5bbfc7fb81",
    options: "ต่อชิ้น"
  },
  {
    id: 8,
    name: "บลูเบอร์รี ชีสเค้ก",
    category: "cake",
    price: 135,
    description: "ชีสเค้กเนื้อเนียน พร้อมซอสบลูเบอร์รี",
    image: "photo-1533134242443-d4fd215305ad",
    options: "ต่อชิ้น"
  },
  {
    id: 9,
    name: "ช็อกโกแลต เค้ก",
    category: "cake",
    price: 125,
    description: "ช็อกโกแลตรสเข้ม เนื้อเค้กนุ่มชุ่มฉ่ำ",
    image: "photo-1578985545062-69928b1d9587",
    options: "ต่อชิ้น"
  }
];

const categoryLabels = {
  coffee: "COFFEE",
  tea: "TEA",
  cake: "CAKE"
};

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0
});

const menuGrid = document.querySelector("#menu-grid");
const menuStatus = document.querySelector("#menu-status");
const filterButtons = document.querySelectorAll(".filter-button");

const menuDialog = document.querySelector("#menu-dialog");
const closeDialogButton = document.querySelector("#close-dialog");

const dialogImage = document.querySelector("#dialog-image");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogPrice = document.querySelector("#dialog-price");

let lastFocusedButton = null;

function getImageUrl(imageId) {
  return (
    `https://images.unsplash.com/${imageId}` +
    "?auto=format&fit=crop&w=800&q=80"
  );
}

function createMenuCard(item) {
  const card = document.createElement("article");
  card.className = "menu-card";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "menu-image-wrapper";

  const image = document.createElement("img");
  image.className = "menu-image";
  image.src = getImageUrl(item.image);
  image.alt = item.name;
  image.loading = "lazy";
  image.width = 800;
  image.height = 600;

  imageWrapper.append(image);

  const content = document.createElement("div");
  content.className = "menu-card-content";

  const heading = document.createElement("div");
  heading.className = "menu-card-heading";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const price = document.createElement("span");
  price.className = "menu-price";
  price.textContent = priceFormatter.format(item.price);

  heading.append(title, price);

  const description = document.createElement("p");
  description.className = "menu-description";
  description.textContent = item.description;

  const bottom = document.createElement("div");
  bottom.className = "menu-card-bottom";

  const category = document.createElement("span");
  category.className = "menu-category";
  category.textContent = categoryLabels[item.category];

  const detailsButton = document.createElement("button");
  detailsButton.className = "details-button";
  detailsButton.type = "button";
  detailsButton.dataset.id = String(item.id);
  detailsButton.textContent = "ดูรายละเอียด ↗";
  detailsButton.setAttribute(
    "aria-label",
    `ดูรายละเอียด ${item.name}`
  );

  bottom.append(category, detailsButton);
  content.append(heading, description, bottom);
  card.append(imageWrapper, content);

  return card;
}

function renderMenu(category = "all") {
  const filteredItems = menuItems.filter((item) => {
    return category === "all" || item.category === category;
  });

  const fragment = document.createDocumentFragment();

  filteredItems.forEach((item) => {
    fragment.append(createMenuCard(item));
  });

  menuGrid.replaceChildren(fragment);
  menuStatus.textContent = `แสดง ${filteredItems.length} เมนู`;
}

function updateActiveFilter(selectedButton) {
  filterButtons.forEach((button) => {
    const isSelected = button === selectedButton;

    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function openMenuDetails(item, triggerButton) {
  lastFocusedButton = triggerButton;

  dialogImage.src = getImageUrl(item.image);
  dialogImage.alt = item.name;

  dialogCategory.textContent = categoryLabels[item.category];
  dialogTitle.textContent = item.name;
  dialogDescription.textContent =
    `${item.description} · ${item.options}`;

  dialogPrice.textContent = priceFormatter.format(item.price);

  menuDialog.showModal();
  document.body.classList.add("dialog-open");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateActiveFilter(button);
    renderMenu(button.dataset.category);
  });
});

// ใช้ event delegation เพื่อรองรับการ์ดที่สร้างใหม่หลังกรองหมวดหมู่
menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".details-button");

  if (!button) {
    return;
  }

  const itemId = Number(button.dataset.id);
  const selectedItem = menuItems.find((item) => item.id === itemId);

  if (!selectedItem) {
    return;
  }

  openMenuDetails(selectedItem, button);
});

closeDialogButton.addEventListener("click", () => {
  menuDialog.close();
});

// ปิดเมื่อคลิกพื้นที่ด้านนอกหน้าต่างรายละเอียด
menuDialog.addEventListener("click", (event) => {
  if (event.target !== menuDialog) {
    return;
  }

  const bounds = menuDialog.getBoundingClientRect();

  const isOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (isOutside) {
    menuDialog.close();
  }
});

menuDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  lastFocusedButton?.focus();
});

document.querySelector("#current-year").textContent =
  new Date().getFullYear();

renderMenu();