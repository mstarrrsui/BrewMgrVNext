namespace BrewMgrCore.Model
{
    public class Hop
    {
       
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public decimal BetaAcid { get; set; }
        public decimal AlphaAcid { get; set; }
        public string UseIn { get; set; }
        public string CountryOfOrigin { get; set; }
        public decimal HSI { get; set; }
    }
}