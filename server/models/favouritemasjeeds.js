export const favouriteMasjeedsTable = `
    CREATE TABLE IF NOT EXISTS favouritemasjeeds(
        id INT AUTO_INCREMENT PRIMARY KEY,
        deviceid INT NOT NULL,
        favouritemasjeddid INT NOT NULL,
        FOREIGN KEY (favouritemasjeddid) REFERENCES masjeed(id)
    )
`;
