import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';

@Injectable()
export class ScraperService {
  async scrape(url: string): Promise<any[]> {
    const config: AxiosRequestConfig = {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    };

    try {
      const response = await axios.get(url, config);

      const decodedResponse = iconv.decode(response.data, 'ISO-8859-2');
      const $ = cheerio.load(decodedResponse);
      const teams = [];
      const teamNames = new Set();

      $('table tr').each((index, element) => {
        const tds = $(element)
          .find('td')
          .toArray()
          .map((td) => $(td).text().trim());
        if (
          tds.length > 1 &&
          !isNaN(parseInt(tds[0], 10)) &&
          !teamNames.has(tds[1])
        ) {
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
          teamNames.add(tds[1]);
        }
      });

      return teams;
    } catch (error) {
      console.error('Error during scraping:', error.message);
      throw new Error('Error during scraping process');
    }
  }

  async scrapeMatchWeeks(url: string): Promise<any[]> {
    const config: AxiosRequestConfig = {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    };

    try {
      const response = await axios.get(url, config);
      const decodedResponse = iconv.decode(response.data, 'ISO-8859-2');
      const $ = cheerio.load(decodedResponse);
      const matchWeeks = [];

      // Znajdź wszystkie tabele z klasą 'main' i przetwarzaj je parami
      const tables = $('table.main').toArray();

      for (let i = 0; i < tables.length; i += 2) {
        const headerTable = tables[i]; // Tabela z nagłówkiem
        const resultsTable = tables[i + 1]; // Tabela z wynikami meczów

        // Pobierz nagłówek z pierwszej tabeli
        const header = $(headerTable)
          .find('tr')
          .first()
          .find('b u')
          .text()
          .trim();

        if (header && header.includes('Kolejka')) {
          const matches = [];
          $(resultsTable)
            .find('tr')
            .slice(1)
            .each((i, element) => {
              const tds = $(element)
                .find('td')
                .toArray()
                .map((td) => $(td).text().trim());
              if (tds.length >= 4) {
                const matchData = {
                  homeTeam: tds[0],
                  score: tds[1],
                  awayTeam: tds[2],
                  dateTime: tds[3],
                };
                matches.push(matchData);
              }
            });

          if (matches.length > 0) {
            matchWeeks.push({
              weekInfo: header,
              matches: matches,
            });
          }
        }
      }

      return matchWeeks;
    } catch (error) {
      console.error('Error during scraping:', error.message);
      throw new Error('Error during scraping process');
    }
  }
}
