## Overview
This is a Python script that crawls staff pages on various government websites and extracts email addresses. The script uses the Scrapy library to crawl and scrape data from the following websites:
- https://sidingbamun.gov.np/staff
- https://mikwakholamun.gov.np/staff
- https://meringdenmun.gov.np/staff
- and more if you configure it well

The extracted email addresses are written to a text file named after the website's domain in a folder named `Data`. 

## Prerequisites
- Python 3.x
- Scrapy library

## Installation
1. Clone this repository to your local machine.
2. Navigate to the repository directory using the terminal or command prompt.
3. Install Scrapy if you haven't already:
   ```bash
   pip install scrapy
   ```

## Usage
1. Open a terminal or command prompt and navigate to the cloned repository directory.
2. Run the Python script:
   ```bash
   scrapy crawl govsite
   ```

This will start the crawling process. The script will visit each of the URLs specified in the `start_urls` list and extract email addresses from the staff pages. The extracted email addresses will be saved in the `Data` folder in text files named after the website's domain.

## File Structure
- `README.md`: This file.
- `govsite`: The main Python script that crawls the government websites and extracts email addresses.
- `scrapy.cfg`: A Scrapy configuration file.
- `Data/`: A folder containing the text files with extracted email addresses.

## Notes
- The script assumes that the email addresses are present in `<td>` tags on the staff pages. If the structure of the staff pages changes, the script may need to be updated.
- The script may take some time to run, depending on the number of URLs and the size of the staff pages.
- The script saves the extracted email addresses as plain text files. You can modify the script to save the data in a different format if needed.
- Make sure to respect the terms of use of the websites you're scraping.

Welcome to our repository! In this guide, we'll walk you through setting up a virtual environment and installing the necessary requirements for our project.

--

## Setting Up Your Virtual Environment

A virtual environment is a great way to isolate project dependencies and ensure that the correct versions of packages are installed without affecting your system's global configuration. Follow these steps to create and activate a virtual environment:

1. **Install `virtualenv` (if you don't have it already):**

   ```bash
   pip install virtualenv
   ```

2. **Create a new virtual environment:**

   ```bash
   virtualenv venv
   ```

   Replace `venv` with your desired virtual environment name.

3. **Activate the virtual environment:**

   - On Windows, run:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS and Linux, run:
     ```bash
     source venv/bin/activate
     ```

   Once activated, your terminal prompt will change, indicating that you're now working within the virtual environment.

4. **Install Project Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

   This command will install all the required packages specified in `requirements.txt` into your virtual environment.

5. **When Finished, Deactivate the Virtual Environment:**

   To exit the virtual environment, simply run:
   ```bash
   deactivate
   ```

## Running the Project

After setting up your virtual environment and installing the requirements, you can run the project using the following command after going into the folder:

```bash
scrapy crawl your_spider
```

Replace `your_spider` with the name of the spider you want to run.

## Updating Requirements

If you need to update the project's dependencies, you can do so by modifying `requirements.txt`. After making changes, run the following command to update the virtual environment:

```bash
pip install -r requirements.txt
```

That's it! You should now have a virtual environment set up for our project, with all the necessary requirements installed. If you encounter any issues, feel free to reach out to us. Happy coding!
