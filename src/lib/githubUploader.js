//handle base64 conversion and Octokit/Fetch PUT request
export const uploadFile = async (fileData, path , githubToken, sha = null) => {
    const owner = import.meta.env.VITE_ADMIN_GITHUB_USERNAME; // Replace with your GitHub username
    const repo = 'kastronPortfolio';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    let encodedContent;

    if (fileData instanceof File) {
        encodedContent = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                //extract the base64 string without the "data:image/png;base64," prefix
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file as base64'));
            }
            reader.readAsDataURL(fileData);
        });
    }

    else if (typeof fileData === 'string') {
        // btoa() requires ASCII, so we encode special characters (like emojis or Chinese characters) first
        encodedContent = btoa(unescape(encodeURIComponent(fileData))); //for raw Markdown text
    }

    const body = {
        message: `Update ${path}`,
        content: encodedContent,
        sha: sha || undefined, // Include SHA if updating an existing file
    };

    try {
        //write fetch() PUT request to apiUrl , pass the githubToken in the Authorization header
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`GitHub API error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.content.downlaod_url; // Return the download URL to display image 


    } catch (error) {
        console.error('Error uploading file to GitHub:', error);
        throw error;
    }
}