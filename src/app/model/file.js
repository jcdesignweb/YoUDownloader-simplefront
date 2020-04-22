
class File {

    constructor(file) {
        this.author_name = file.author_name;
        this.author_url = file.author_url;
        this.filename = file.filename;
        this.height = file.height;
        this.html = file.html;
        this.id = file.id;
        this.provider_url = file.provider_url;
        this.provider_name = file.provider_name;
        this.thumbnail_height = file.thumbnail_height;
        this.thumbnail_width = file.thumbnail_width;
        this.thumbnail_url = file.thumbnail_url;
        this.title = file.title;
        this.type = file.type;
        this.version = file.version;
        this.width = file.width;
    }

    getSrc() {
        return this.filename;
    }

    getTitle() {
        return this.title;
    }

    getThumbnailInfo() {
        return {
            thumbnail_height: this.thumbnail_height,
            thumbnail_width: this.thumbnail_width,
            thumbnail_url: this.thumbnail_url,

        }
    }

}

export default File;