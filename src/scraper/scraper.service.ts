import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';

@Injectable()
export class ScraperService {
  async scrape(url: string): Promise<any[]> {
    const config: AxiosRequestConfig = {
      responseType: 'arraybuffer',
    };

    try {
      const response = await axios.get(url, config);
      const decodedResponse = iconv.decode(response.data, 'ISO-8859-2');
      const $ = cheerio.load(decodedResponse);
      const teams = [];

      $('table tr').each((index, element) => {
        const tds = $(element)
          .find('td')
          .toArray()
          .map((td) => $(td).text().trim());
        if (tds.length > 1 && !isNaN(parseInt(tds[0], 10))) {
          const teamData = {
            rank: parseInt(tds[0], 10),
            name: tds[1],
            matches: parseInt(tds[2], 10),
            points: parseInt(tds[3], 10),
            wins: parseInt(tds[4], 10),
            draws: parseInt(tds[5], 10),
            losses: parseInt(tds[6], 10),
            goalsForAgainst: tds[7],
            homeWins: parseInt(tds[8], 10),
            homeDraws: parseInt(tds[9], 10),
            homeLosses: parseInt(tds[10], 10),
            homeGoalsForAgainst: tds[11],
            awayWins: parseInt(tds[12], 10),
            awayDraws: parseInt(tds[13], 10),
            awayLosses: parseInt(tds[14], 10),
            awayGoalsForAgainst: tds[15],
          };
          teams.push(teamData);
        }
      });

      return teams;
    } catch (error) {
      console.error('Error during scraping:', error.message);
      throw new Error('Error during scraping process');
    }
  }
}
