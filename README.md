# Starknet Automation

This project is a TypeScript-based application that utilizes Node.js and npm. It includes a configuration file `SAMPLE-CONFIG.ts` that sets up various parameters for the application. The script automates activity on Starknet network.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).
-   You have a basic understanding of TypeScript and Node.js.

## Installing Starknet

To install Starknet, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the project dependencies:

```bash
npm install
```

## Configuring Starknet

To configure the application, you need to

1. RENAME SAMPLE-CONFIG.ts to config.ts
2. Create .env somewhere on your machine. The file should have the following:

```
SECRETS=[{"name": "1", "type": "argent", "address": "address1", "privateKey": "privateKey1"}, {"name": "2", "type": "braavos", "address": "address2", "privateKey": "privateKey2"}]
```

3. Add 'resources' folder inside the project folder. Add excludedWallets.txt and proxies.txt inside this folder. Inside the excludedWallets.txt you can add wallet addressed that you want to exclude from the automation
4. In MODULUS_CONFIG.ts adjust settings as you see fit. Most are either self explanatory or have explanation in comments

## Running Starknet

To run Starknet, execute the following command:

```bash
npm run starknet
```

## Disclaimer

This script is provided "as is" and any expressed or implied warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose are disclaimed. In no event shall the author or contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software, even if advised of the possibility of such damage. The user assumes all responsibility for the use of this software and runs it at their own risk.
