using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace BrewMgrCore.Model
{
    public static class DbInitializer
    {
        public static void Initialize(IngredientsContext ctx)
        {
            ctx.Database.EnsureCreated();

            if (ctx.Hops.Any())
            {
                return;
            }

            var hops = ReadData<Hop>("hops.json", item => {
                var h = new Hop
                    {
                        Id = item.id,
                        Name = item.name,
                        Description = item.description,
                        Type = item.type,
                        CountryOfOrigin = item.countryOfOrigin,
                        AlphaAcid = item.alphaAcid ?? Decimal.Parse(item.alphaAcid),
                        BetaAcid = item.betaAcid ?? Decimal.Parse(item.betaAcid),
                        HSI = item.hsi ?? Decimal.Parse(item.hsi),
                        UseIn = item.useIn
                    };
                 Console.WriteLine($"{h.Id} {h.Name} {h.AlphaAcid}");
                 return h;
                }
            );

            //var ids = hops.Where(h => h.Id == 1);
            //foreach (var hop in ids)
            //{
            //    Console.WriteLine($"Name: {hop.Name}");
            //}

            foreach (var h in hops)
            {
                ctx.Hops.Add(h);
            }

            ctx.SaveChanges();
        }

        private static IEnumerable<T> ReadData<T>(string filename, Func<dynamic,T> map)
        {
            //read data file
            var itemlist = new List<T>();
            using (StreamReader r = new StreamReader(filename))
            {
                string json = r.ReadToEnd();
                dynamic jdata = JsonConvert.DeserializeObject(json);
                //fix the file so that data is not under data attribute
                foreach (var item in jdata.data)
                {
                    var h = map(item);
                    itemlist.Add(h);
                }
            }
            return itemlist;
        }
    }
}