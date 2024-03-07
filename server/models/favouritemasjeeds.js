export const favouriteMasjeedsTable = `
    CREATE TABLE IF NOT EXISTS favouritemasjeeds(
        id INT AUTO_INCREMENT PRIMARY KEY,
        favouritemasjeddid INT,
        FOREIGN KEY (favouritemasjeddid) REFERENCES masjeed(id)
    )
`;
