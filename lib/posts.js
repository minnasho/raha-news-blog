import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {

    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map(fileName => {

        // Remove ".json" from file name to get id
        const id = fileName.replace(/\.json$/, '');

        // Read json file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const jsonfileContents = JSON.parse(fileContents);

        return {
            id, jsonfileContents
        }
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

 export const upload = {
    savePosts: (values, setSubmitting) => savePosts(values, resetForm, setSubmitting)
}

export function savePosts(values, resetForm, setSubmitting) {
    // write to a new file named [title].json
    const fileContent = JSON.stringify(values, null, 2);
    console.log(fileContent);
    fs.writeFileSync(`/posts/${values.title}.json`, fileContent);
    setSubmitting(false);
    resetForm({});
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.json$/, '')
            }
        }
    })
}

export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.json`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const jsonfileContents = JSON.parse(fileContents);

    // Combine the data with the id
    return {
        id,
        jsonfileContents
    }
}