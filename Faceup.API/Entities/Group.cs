using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Faceup.API.Entities
{
    public class Group
    {
        public Group()
        {
        }

        public Group(string name)
        {
            GroupName = name;
        }

        [Key]
        public string GroupName { get; set; }
        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}