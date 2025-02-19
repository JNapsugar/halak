using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using halak_backend.DTOs;
using halak_backend.Models;
using System;

namespace halak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HalakController : ControllerBase
    {
        private readonly HalakContext _context;

        public HalakController(HalakContext context)
        {
            _context = context;
        }

        [HttpGet("halakTo")]
        public async Task<ActionResult<IEnumerable<HalToDTO>>> GetHalak()
        {
            var result = await _context.Halaks
                .Include(h => h.To)
                .Select(h => new HalToDTO { Nev = h.Nev, ToNev = h.To.Nev })
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("fogasok")]
        public async Task<ActionResult<IEnumerable<FogasDTO>>> GetFogasok()
        {
            var result = await _context.Fogasoks
                .Include(f => f.Hal)
                .Include(f => f.Horgasz)
                .Select(f => new FogasDTO { HorgaszNev = f.Horgasz.Nev, HalNev = f.Hal.Nev, Datum = f.Datum })
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("top3hal")]
        public async Task<ActionResult<IEnumerable<TopHalDTO>>> GetTopHalak()
        {
            var result = await _context.Halaks
                .OrderByDescending(h => h.MeretCm)
                .Take(3)
                .Select(h => new TopHalDTO { Nev = h.Nev, MeretCm = h.MeretCm })
                .ToListAsync();
            return Ok(result);
        }

    }
}
